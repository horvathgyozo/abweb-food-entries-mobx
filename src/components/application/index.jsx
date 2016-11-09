import React, { Component } from 'react';
// import logo from './logo.svg';
import NavBar from '../navbar/'
import Panel from '../panel/'

class Application extends Component {

  constructor(props) {
    super(props)
    this.state = {
      uiState: 'list', // 'list', 'new'
      date: new Date('2016-10-05'),
      entries: [
        { 
          date: '2016. 10. 05.',
          meal: 'reggeli',
          food: 'kenyér',
          quantity: '20gr', 
        },
        { 
          date: '2016. 10. 05.',
          meal: 'reggeli',
          food: 'sajt',
          quantity: '5gr', 
        },
        { 
          date: '2016. 10. 05.',
          meal: 'tízórai',
          food: 'alma',
          quantity: '200gr', 
        },
        { 
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
      uiState: this.state.uiState === 'list' ? 'new' : 'list'
    })
  }

  render() {

    const date = this.state.date.toLocaleDateString()
    const { entries } = this.state

    const entriesByDate = 
      entries.filter(entry => entry.date === date)

    const meals = new Set(entriesByDate.map(entry => entry.meal))
    
    const panels = Array.from(meals.values()).map(meal => 
      <Panel 
        title={meal} 
        items={entriesByDate.filter(entry=>entry.meal === meal)} 
      />
    )

    const compMapping = {
      'list': (
        <div className="row">
          {panels}
          <button className="btn btn-danger add-button"
            onClick={e => this.handleAddClick(e)}>+</button>
        </div> 
      ),
      'new': (
        <p>alma</p>
      )
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
