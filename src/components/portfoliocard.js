import React, { Component } from 'react';
import PortfolioTable from './table.js';
import {CardButton, CardButtonGroup} from './buttons.js';
import './cards.css';

const url = 'https://www.alphavantage.co/query';
const apikey = 'DKS7EZJHQPLHV5WG';


class PortfolioCards extends Component {
  constructor(props) {
    super(props);
    
    this.state = {portfolios: []};

    this.addNewPortfolio = this.addNewPortfolio.bind(this);
    this.deletePortfolio = this.deletePortfolio.bind(this);
  }

  addNewPortfolio() {
    let x = prompt("Enter name of portfolio: ", "Portfolio1");
    console.log(x);

    this.setState({
      portfolios: [...this.state.portfolios, <PortfolioCard portfolioName={x}/>]
    })
  }

  deletePortfolio() {

  }

  render() {
    return (
      <div className="PortfolioCards">
        <div id="firstRow">
          <CardButton onClick={this.addNewPortfolio} butonId="addPortfolio" buttonText="Add new portfolio"/>
        </div>
        <div id="cards">
          {this.state.portfolios.map(function(item, key) {
            return (
              <div key={key}>
                {item}
              </div>
            )
          })
          }
        </div>
      </div>
    );
  }
}

class PortfolioCard extends Component {
  constructor(props) {
    super(props);
    this.portfolioName = props.portfolioName;
    this.state = {stocks: 0};
    this.addNewStock = this.addNewStock.bind(this);
  }

  addNewStock() {
    this.setState({
      stocks: this.state.stocks + 1
    })
    console.log(this.state.stocks);
  }

  render() {
    return (
      <div className="card">
        <h3>{this.portfolioName}</h3>
        <PortfolioData />
        <CardButtonGroup 
          addStockClick={this.addNewStock}
        />
      </div>
    )
  }
}

class PortfolioData extends Component {

  constructor(props) {
    super(props);
    this.requestData = "";
    this.params = {};
    this.state = {data: []};
  }



  fetchData() {
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({data}))
      .catch(console.log('Error'));
  }

  handleData() {

  }

  render() {
    return (
      <div className="tableDiv">
        <PortfolioTable />


      </div>
    )
  }
}


export default PortfolioCards;