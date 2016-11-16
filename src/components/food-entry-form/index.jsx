import React, { Component } from 'react';
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

@observer
export default class FoodEntryForm extends Component {

  @observable food = 'q'
  @observable quantity = 20
  @observable meal = 'tízórai'

  constructor(props) {
    super(props);
    this.copyEntry(this.props.entry)
  }

  @action copyEntry(entry) {
    Object.assign(this, entry)
  }

  @action change(key, value) {
    this[key] = value
  }

  isValid() {
    return this.food !== '' && this.quantity !== ''
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.isValid()) {
      const { food, quantity, meal } = this
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
                value={this.food}  
                onChange={e => this.change('food', e.target.value) }
                required
              />
              <span className="help-block">Validation is based on string length.</span>
            </div>

            <div className="form-group has-feedback">
              <label htmlFor="quantity" className="control-label">Quantity</label>
              <input type="text" placeholder="Enter text" id="quantity" className="form-control" 
                value={this.quantity}  
                onChange={e => this.change('quantity', e.target.value) }
                required
              />
              <span className="help-block">Validation is based on string length.</span>
            </div>

            <div className="form-group">
              <label htmlFor="meal" className="control-label">Meal</label>
              <select placeholder="select" id="meal" className="form-control"
                value={this.meal}
                onChange={e => this.change('meal', e.target.value) }
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
                    { this.id &&
                      <button type="button" className="btn btn-danger" onClick={e => this.props.onDelete()}>Delete</button>
                    }
                </div>
            </div>
        </form>
      </div> 
    );
  }
}
