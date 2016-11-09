import React, { Component } from 'react';
// import logo from './logo.svg';
import NavBar from '../navbar/'
import Panel from '../panel/'

class Application extends Component {

  constructor(props) {
    super(props)
    this.state = {
      entries: [
        { 
          date: '2016.10.05.',
          meal: 'reggeli',
          food: 'kenyér',
          quantity: '20gr', 
        },
        { 
          date: '2016.10.05.',
          meal: 'reggeli',
          food: 'sajt',
          quantity: '5gr', 
        },
        { 
          date: '2016.10.05.',
          meal: 'tízórai',
          food: 'alma',
          quantity: '200gr', 
        },
        { 
          date: '2016.10.06.',
          meal: 'reggeli',
          food: 'kenyér',
          quantity: '20gr', 
        },
        
      ]
    }
  }

  render() {

    const date = "2016.10.06."
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

    return (
      <div>
        <NavBar />
        <h2>{date}</h2>
        {panels}
      </div>
    );
  }
}

export default Application;
