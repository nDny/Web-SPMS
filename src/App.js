import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PortfolioCard from './components/portfoliocard.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PortfolioCard />
      </div>
    );
  }
}

export default App;
