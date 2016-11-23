import React, { Component } from 'react';
import { observer } from 'mobx-react'

@observer(['state'])
class Panel extends Component {
  render() {

    const { title, items } = this.props
    const tableRows = items.map((item, i) => 
      <tr key={i} onClick={() => this.props.state.selectEntry(item)}
        className={item.notSynced ? 'not-synced' : ''}
      >
        <td>{item.food}</td>
        <td>{item.quantity}</td>
        <td>{item.ch}</td>
        <td>{item.kcal}</td>
      </tr>
    )


    return (
      <div className="panel panel-primary">
        <div className="panel-heading">{title}</div>
        <table className="table table-striped table-hover ">
          <tbody>
            {tableRows}
          </tbody>
        </table> 
      </div>
    );
  }
}

export default Panel;

