import React, { Component } from "react";
import { connect } from "react-redux";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    console.log(this.props.name);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default connect(state => state.app)(App);
