import React, { Component } from 'react';
import PortfolioTable from './table.js';
import {CardButton, CardButtonGroup} from './buttons.js';
import './cards.css';
import $ from 'jquery';
import Stock from './stock.js';

const url = 'https://www.alphavantage.co/query';
const apikey = 'DKS7EZJHQPLHV5WG';


class PortfolioCards extends Component {
  constructor(props) {
    super(props);
    this.portfolioModal = false;
    this.state = {portfolios: []};

    this.addNewPortfolio = this.addNewPortfolio.bind(this);
    this.deletePortfolio = this.deletePortfolio.bind(this);
  }

  showPortfolioModal() {
    this.portfolioModal = true;
  }

  hidePortfolioModal() {
    this.portfolioModal = false;
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
    this.showGraph = this.showGraph.bind(this);
    this.removeSelectedStocks = this.removeSelectedStocks.bind(this);
  }

  

  showGraph() {
    
  }

  removeSelectedStocks() {
    this.setState({
      stocks: this.state.stocks - 1
    });
  }

  render() {
    return (
      <div className="card">
        <h3>{this.portfolioName}</h3>
        <PortfolioData apiSymbol='MSFT'/>
        
      </div>
    )
  }
}

class PortfolioData extends Component {
  stock = [];
  constructor(props) {
    super(props);
    this.addNewStock = this.addNewStock.bind(this);
    this.apiFunction = "TIME_SERIES_DAILY";
    this.apiSymbol = props.apiSymbol;
  }

  addNewStock() {
    this.fetchData();
  }


  fetchData() {
    $.ajax({
      type: "GET",
      url: url,
      data: {function:this.apiFunction, symbol: this.apiSymbol, apikey: apikey},
      success: function (response) {
        $.each(response['Time Series (Daily)'], function (indexInArray, valueOfElement) { 
           console.log(valueOfElement['4. close']);
        });
      }
    });
  }


  handleData() {
    //Weekly Time Series
    console.log(this.stocks.size)
  }

  render() {
    return (
      <div className="tableDiv">
        <PortfolioTable />
        <CardButtonGroup 
          addStockClick={this.addNewStock} 
          removeStockClick={this.removeSelectedStocks}
        />

      </div>
    )
  }
}


class SearchCompletion extends Component {
  
  render() {
    return (
       <div>
         <input name="userIn" 
                  type="text" 
                  onChange={(evt) => { console.log(evt.target.value); }} />
       </div>
    );
  }
}


export default PortfolioCards;