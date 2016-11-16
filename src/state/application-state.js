import { observable, computed, action } from 'mobx'

export default class AppState {
  _id = 10
  @observable date = new Date('2016-10-05')
  @observable selectedEntry = null
  @observable entries = [
    { 
      id: 1,
      date: '2016. 10. 05.',
      meal: 'reggeli',
      food: 'kenyér',
      quantity: '20gr', 
    },
    { 
      id: 2,
      date: '2016. 10. 05.',
      meal: 'reggeli',
      food: 'sajt',
      quantity: '5gr', 
    },
    { 
      id: 3,
      date: '2016. 10. 05.',
      meal: 'tízórai',
      food: 'alma',
      quantity: '200gr', 
    },
    { 
      id: 4,
      date: '2016. 10. 06.',
      meal: 'reggeli',
      food: 'kenyér',
      quantity: '20gr', 
    },
    
  ]

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
    data.id = ++this._id
    data.date = this.localDateString
    this.entries.push(data)
  }

  @action updateEntry(entry, data) {
    data.date = this.localDateString
    Object.assign(entry, data)
  }

  @action deleteEntry(entry) {
    const index = this.entries.indexOf(entry)
    this.entries.splice(index, 1)
  }
}