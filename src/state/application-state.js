import { observable, computed, action, reaction } from 'mobx'
import uuid from 'uuid'

export default class AppState {
  _id = 10
  @observable date = new Date()
  @observable selectedEntry = null
  @observable entries = []
  dates = new Set()


  constructor() {
    reaction(
      () => this.localDateString,
      date => this.getEntriesForDate(date) 
    )
    this.getEntriesForDate(this.localDateString)
  }

  getEntriesForDate(date) {
    if (this.dates.has(date)) return

    fetch(`http://localhost:4000/entries?filter[date]=${date}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      }
    })
    .then(response => response.json())
    .then(json => json.data.map(obj => Object.assign(obj.attributes, {id: obj.id})))
    .then(action(arr => arr.forEach(entry => this.entries.push(entry))))
    .then(() => {
      this.dates.add(date)
    })
    .catch(e => console.log(e))
  }

  @computed get localDateString() {
    return this.date.toLocaleDateString()
  }

  @computed get meals() {
    const date = this.localDateString
    const { entries } = this

    const entriesByDate = 
      entries.filter(entry => entry.date === date)

    const meals = new Set(entriesByDate.map(entry => entry.meal))

    const itemsByMeal = new Map()
    meals.forEach(meal => itemsByMeal.set(meal, entriesByDate.filter(entry=>entry.meal === meal)))
    
    return itemsByMeal
  }

  @computed get uiState() {
    return this.selectedEntry ? 'form' : 'list'
  }

  @action selectEntry(entry) {
    this.selectedEntry = entry
  }

  @action decreaseDate() {
    this.date = new Date(this.date.getTime() - 1000*60*60*24)
  }

  @action increaseDate() {
    this.date = new Date(this.date.getTime() + 1000*60*60*24)
  }

  @action addEntry(data) {
    data.id = uuid.v1()
    data.date = this.localDateString
    data.synced = false
    this.entries.push(data)

    const jsonData = {
      data: {
        type: 'entries',
        id: data.id,
        attributes: {
          date: data.date,
          meal: data.meal,
          food: data.food,
          quantity: data.quantity
        }
      }
    }
    fetch(`http://localhost:4000/entries`, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      body: JSON.stringify(jsonData)
    })
    .then(action(() => data.synced = true))
  }

  @action updateEntry(entry, data) {
    data.date = this.localDateString
    Object.assign(entry, data, { synced: false })

    const jsonData = {
      data: {
        type: 'entry',
        id: entry.id,
        attributes: data
      }
    } 
    fetch(`http://localhost:4000/entries/${encodeURIComponent(entry.id)}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      },
      body: JSON.stringify(jsonData)
    })
      .then(action(() => data.synced = true))
  }

  @action deleteEntry(entry) {
    const index = this.entries.indexOf(entry)
    this.entries.splice(index, 1)

    fetch(`http://localhost:4000/entry/${encodeURIComponent(entry.id)}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/vnd.api+json',
      }
    })
  }
}