import React, { Component } from 'react';
import './App.css';
import NumberIncrementer from './NumberIncrementer.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Number Incrementer</h1>
        </header>
        <NumberIncrementer />
      </div>
    );
  }
}

export default App;
