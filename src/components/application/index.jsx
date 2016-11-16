import React, { Component } from 'react';
import NavBar from '../navbar/'
import FoodEntriesList from '../food-entries-list/'
import FoodEntryForm from '../food-entry-form/'

let id = 10

class Application extends Component {

  constructor(props) {
    super(props)
    this.state = {
      uiState: 'list', // 'list', 'new'
      date: new Date('2016-10-05'),
      selectedEntry: null,
      entries: [
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
    }
  }

  handlePrevDateClick(e) {
    const { date } = this.state
    this.setState({
      date: new Date(date.getTime() - 1000*60*60*24)
    })
  }

  handleNextDateClick(e) {
    const { date } = this.state
    this.setState({
      date: new Date(date.getTime() + 1000*60*60*24)
    })
  }

  handleAddClick(e) {
    this.setState({
      uiState: 'new'
    })
  }

  handleEntrySubmission(data) {
    data.date = this.localDateString
    if (this.state.selectedEntry) {
      const { selectedEntry: entry } = this.state
      Object.assign(entry, data)
      const { entries } = this.state
      const index = entries.indexOf(entry)
      this.setState({
        entries: [...entries.slice(0, index), entry, ...entries.slice(index+1, entries.length)],
        selectedEntry: null,
        uiState: 'list'
      })
    } else {
      data.id = ++id
      this.setState({
        entries: this.state.entries.concat(data),
        uiState: 'list'
      })
    }
  }

  handleEntryClick(entry) {
    this.setState({
      uiState: 'new',
      selectedEntry: entry
    })
  }

  handleCancelEntry() {
    this.setState({
      uiState: 'list',
      selectedEntry: null
    })
  }

  handleDeleteEntry() {
    const { selectedEntry: entry } = this.state
    const { entries } = this.state
    const index = entries.indexOf(entry)
    entries.splice(index, 1)
    this.setState({
      entries,
      selectedEntry: null,
      uiState: 'list'
    })
  }

  get localDateString() {
    return this.state.date.toLocaleDateString()
  }

  get meals() {
    const date = this.localDateString
    const { entries } = this.state

    const entriesByDate = 
      entries.filter(entry => entry.date === date)

    const meals = new Set(entriesByDate.map(entry => entry.meal))

    const itemsByMeal = new Map()
    meals.forEach(meal => itemsByMeal.set(meal, entriesByDate.filter(entry=>entry.meal === meal)))
    
    return itemsByMeal
  }

  render() {

    const date = this.state.date.toLocaleDateString()

    const compMapping = {
      'list': <FoodEntriesList 
        meals={this.meals} 
        handleAddClick={e => this.handleAddClick(e)}
        onEntryClick={entry => this.handleEntryClick(entry)}
      />,
      'new': <FoodEntryForm 
        onSubmit={data => this.handleEntrySubmission(data)}
        entry={this.state.selectedEntry} 
        onBack={() => this.handleCancelEntry()}
        onDelete={() => this.handleDeleteEntry()}
      />
    }
    const comp = compMapping[this.state.uiState]

    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-xs-2">
              <button className="btn btn-default"
                onClick={e => this.handlePrevDateClick(e)}>&lt;</button>
            </div>
            <div className="col-xs-8">
              <h2>{date}</h2>
            </div>
            <div className="col-xs-2">
              <button className="btn btn-default"
                onClick={e => this.handleNextDateClick(e)}>&gt;</button>
            </div>
          </div>

          {comp}

        </div>
        
      </div>
    );
  }
}

export default Application;
