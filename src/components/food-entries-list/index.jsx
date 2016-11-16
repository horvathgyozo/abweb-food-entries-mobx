import React, { Component } from 'react';
import Panel from '../panel/'

export default class FoodEntriesList extends Component {

  get meals() {
    return this.props.meals
  }

  render() {

    const panels = Array.from(this.meals.keys()).map(meal => 
      <Panel 
        title={meal} 
        items={this.meals.get(meal)}
        key={meal}
        onEntryClick={entry => this.props.onEntryClick(entry)}
      />
    )

    return (
      <div className="row">
        {panels}
        <button className="btn btn-danger add-button"
          onClick={e => this.props.handleAddClick(e)}>+</button>
      </div> 
    );
  }
}
