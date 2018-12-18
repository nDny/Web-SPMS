import React, { Component } from 'react';
import PortfolioTable from './table.js';
import {PortfolioButton} from './buttons.js';

class PortfolioCard extends Component {
  constructor(props) {
    super(props);
    this.state = {portfolios: []};
  }

  render() {
    return (
      <div className="PortfolioCard">
        <div id="portfoliobuttonrow">
          <PortfolioButton/>
        </div>
        <div id="tablerow">
          <PortfolioTable />
        </div>
      </div>
    );
  }
}

export default PortfolioCard;