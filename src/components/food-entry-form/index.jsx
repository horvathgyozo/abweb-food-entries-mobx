import React, { Component } from 'react';

export default class FoodEntryForm extends Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({
      food: 'q',
      quantity: 20,
      // date: '2016-11-11',
      meal: 'tízórai',
    }, this.props.entry)
  }

  isValid() {
    return this.state.food !== '' && this.state.quantity !== ''
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.isValid()) {
      const { food, quantity, meal } = this.state
      this.props.onSubmit({
        food, quantity, meal
      })
    }
  }

  render() {

    return (
      <div className="row">
        <form onSubmit={e => this.handleSubmit(e)}>
            <div className="form-group has-feedback">
              <label htmlFor="food" className="control-label">Food name</label>
              <input type="text" placeholder="Enter text" id="food" className="form-control"
                value={this.state.food}  
                onChange={e => this.setState({ food: e.target.value })}
                required
              />
              <span className="help-block">Validation is based on string length.</span>
            </div>

            <div className="form-group has-feedback">
              <label htmlFor="quantity" className="control-label">Quantity</label>
              <input type="text" placeholder="Enter text" id="quantity" className="form-control" 
                value={this.state.quantity}  
                onChange={e => this.setState({ quantity: e.target.value })}
                required
              />
              <span className="help-block">Validation is based on string length.</span>
            </div>

            <div className="form-group">
              <label htmlFor="meal" className="control-label">Meal</label>
              <select placeholder="select" id="meal" className="form-control"
                value={this.state.meal}
                onChange={(e) => this.setState({ meal: e.target.value }) }
                required
              >
                  <option value="reggeli">reggeli</option>
                  <option value="tízórai">tízórai</option>
                  <option value="ebéd">ebéd</option>
                  <option value="uzsonna">uzsonna</option>
                  <option value="vacsora">vacsora</option>
                  <option value="utóvacsora">utóvacsora</option>
              </select>
            </div>

            <div className="form-group">
                <div className="col-lg-10 col-lg-offset-2">
                    <button type="button" className="btn btn-default" onClick={e => this.props.onBack()}>Back</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    { this.state.id &&
                      <button type="button" className="btn btn-danger" onClick={e => this.props.onDelete()}>Delete</button>
                    }
                </div>
            </div>
        </form>
      </div> 
    );
  }
}
