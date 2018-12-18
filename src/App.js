import React, { Component } from 'react';
import './App.css';
import PortfolioCards from './components/portfoliocard.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PortfolioCards />
      </div>
    );
  }
}

export default App;
