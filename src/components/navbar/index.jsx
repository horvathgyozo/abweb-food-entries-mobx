import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
        <div className="navbar-header">
            <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Brand</a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <ul className="nav navbar-nav">
            <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
            <li><a href="#">Link</a></li>
            <li className="dropdown">
                <a className="dropdown-toggle" role="button" aria-expanded="false" href="#" data-toggle="dropdown">Dropdown <span className="caret"></span></a>
                <ul className="dropdown-menu" role="menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li className="divider"></li>
                <li><a href="#">Separated link</a></li>
                <li className="divider"></li>
                <li><a href="#">One more separated link</a></li>
                </ul>
            </li>
            </ul>
            <form className="navbar-form navbar-left" role="search">
            <div className="form-group">
                <input className="form-control" type="text" placeholder="Search" />
            </div>
            <button className="btn btn-default" type="submit">Submit</button>
            </form>
            <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Link</a></li>
            </ul>
        </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;

