import React, { Component } from 'react';
import './App.css';
import StockCardContainer from './newcomponents/StockCardContainer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <StockCardContainer />
      </div>
    );
  }
}

export default App;
