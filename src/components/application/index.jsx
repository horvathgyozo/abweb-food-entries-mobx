import React, { Component } from 'react';
import NavBar from '../navbar/'
import FoodEntriesList from '../food-entries-list/'
import FoodEntryForm from '../food-entry-form/'

import { observer } from 'mobx-react'

let id = 10

@observer(['state'])
class Application extends Component {

  handleAddClick(e) {
    this.props.state.selectEntry({})
  }

  handleEntrySubmission(data) {
    if (this.props.state.selectedEntry.id) {
      this.props.state.updateEntry(this.props.state.selectedEntry, data)
      this.props.state.selectEntry(null)
    } else {
      this.props.state.addEntry(data)
      this.props.state.selectEntry(null)
    }
  }

  handleCancelEntry() {
    this.props.state.selectEntry(null)
  }

  handleDeleteEntry() {
    this.props.state.deleteEntry(this.props.state.selectedEntry)
    this.props.state.selectEntry(null)
  }

  render() {

    const date = this.props.state.localDateString

    const compMapping = {
      'list': <FoodEntriesList 
        meals={this.props.state.meals} 
        handleAddClick={e => this.handleAddClick(e)}
      />,
      'form': <FoodEntryForm 
        onSubmit={data => this.handleEntrySubmission(data)}
        entry={this.props.state.selectedEntry} 
        onBack={() => this.handleCancelEntry()}
        onDelete={() => this.handleDeleteEntry()}
      />
    }
    const comp = compMapping[this.props.state.uiState]

    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-xs-2">
              <button className="btn btn-default"
                onClick={e => this.props.state.decreaseDate()}>&lt;</button>
            </div>
            <div className="col-xs-8">
              <h2>{date}</h2>
            </div>
            <div className="col-xs-2">
              <button className="btn btn-default"
                onClick={e => this.props.state.increaseDate()}>&gt;</button>
            </div>
          </div>

          {comp}

        </div>
        
      </div>
    );
  }
}

export default Application;
