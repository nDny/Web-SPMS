import React from 'react';
import './modal.css';
import '../components/table.css';
import './stockcard.css';
import {CardButtonGroup} from '../components/buttons.js';
import Modal from './modal.js';

const url = 'https://www.alphavantage.co/query';
const apikey = 'DKS7EZJHQPLHV5WG';

class StockCard extends React.Component {
  onDeletePortfolio = this.props.onDeletePortfolio;
  id = this.props.id

    state = {
      currencyModifier: 1,
      selectedCurrency: "USD",
      isFull: false,
      stocks: [],
      show: false,
      stockName: "",
      stockAmount: 0,
      selected: [],
      total: 0
    }

    handleChangeCurrency = (e) => {
      let newCurr = e.target.value;
      let oldCurr = this.state.selectedCurrency;
      fetch(url+'?function=CURRENCY_EXCHANGE_RATE&from_currency='+oldCurr+'&to_currency='+newCurr+'&apikey='+apikey)
      .then(results => {
        return results.json();
      }).then(data => {
        console.log('data:', data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
        let modifier = data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
        let tempStocks = [...this.state.stocks];
        for (let i = 0; i < this.state.stocks.length; i++) {
          tempStocks[i].value[0] = (tempStocks[i].value[0]*modifier).toFixed(2);
          tempStocks[i].total = tempStocks[i].value[0]*tempStocks[i].amount;
        }
        this.setState({
          currencyModifier: modifier,
          selectedCurrency: newCurr,
          stocks: tempStocks
        });
      })
      .catch(error => console.error('Error:', error));

    }

    onDelete = () => {
      this.onDeletePortfolio(this.id);
    }

    onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    showModal = () => {
      if (this.state.stocks.length > 49) {
        this.setState({
          isFull: true
        });
      } else {
        this.setState({
          show: true
        });
      }
      
    }

    handleDone = () => {
      this.setState({
        show: false
      });
      this.handleAddNew();
    }

    handleSelected = (e) => {
      let tempSelected = [...this.state.selected];
      let index;
      let tempStocks = [...this.state.stocks];
      
      if (e.target.checked) {
        tempStocks[e.target.name].checked = true;
        tempSelected.push(e.target.value);
      } else {
        tempStocks[e.target.name].checked = false;
        index = tempSelected.indexOf(e.target.value);
        tempSelected.splice(index, 1);
      }

      this.setState({
        stocks: tempStocks,
        selected: tempSelected
      });
    }

    handleRemoveSelected = () => {
      let tempStocks = [...this.state.stocks];
      let selection = [...this.state.selected];

      for (var x = 0; x < selection.length; x++) {
        for (var y = 0; y < tempStocks.length; y++) {
          if (selection[x] === tempStocks[y].stock) {
            console.log('Deleted :', selection[x]);
            tempStocks.splice(y,1);
          }
        }
      }

      for (var i = 0; i < tempStocks.length; i++) {
        tempStocks[i].checked = false;
      }

      this.setState({
        stocks: tempStocks,
        selected: []
      });
    };
    
    handleAddNew = () => {
      fetch(url+'?function=TIME_SERIES_DAILY&symbol='+this.state.stockName+'&apikey='+apikey)
      .then(results => {
        return results.json();
      }).then(data => {
        let values = [];
        let modifier = 1;
        if (this.state.selectedCurrency !== 'USD') {
          modifier = this.state.currencyModifier;
        }
        for (var key in data['Time Series (Daily)']) {
          let x = (data['Time Series (Daily)'][key]['4. close']) * modifier;
          values.push(x);
        }
        let tempStocks = [...this.state.stocks];
        tempStocks.push({stock: this.state.stockName, value: values, amount: this.state.stockAmount, total: values[0]*this.state.stockAmount, checked: false});
        this.setState({stocks: tempStocks});
      })
      .catch(error => console.error('Error:', error));
    }
    
    setTotal = () => {
      let total = 0;
      for (let i = 0; i < this.state.stocks.length; i++) {
        total += this.state.stocks[i].total;
      }
      return total;
    }

    resetIsFullModal = () => {
      this.setState({
        isFull: false
      });
    }

      render() {
        //console.log('selected :', this.state.selected);
        //console.log('length :', this.state.stocks.length > 0 ? "not zero" : "zero");
    
        return (
          <div className="stockCard">
            <Modal show={this.state.show} handleDone={this.handleDone}>
              <label>Stock symbol: <input name="stockName" type="text" onChange={this.onChange}/></label>
              <br/>
              <label>Number of stocks: <input name="stockAmount" type="text" onChange={this.onChange}/></label>
            </Modal>
            <Modal show={this.state.isFull} handleDone={this.resetIsFullModal}>
              <p>Portfolio full</p>
            </Modal>
            <h2 className="title-name">{this.props.portfolioName}</h2>
            <div align="center" className="curr-buttons">
              <label>
                <input type="radio" name="currency" value="USD" checked={this.state.selectedCurrency === 'USD'} onChange={this.handleChangeCurrency}/>Usd
              </label>
              <label>
                <input type="radio" name="currency" value="EUR" checked={this.state.selectedCurrency === 'EUR'} onChange={this.handleChangeCurrency}/>Eur
              </label>
            </div>
            <table className="portfolioTable">
              <TableHeader />
              <tbody className="table-contents">
              {this.state.stocks.map((item, key) => {
                return (
                  <TableStock data={item} key={key} id={key} onSelect={this.handleSelected} currency={this.state.selectedCurrency}/>
                )
              })}
              </tbody>
              <TableFooter total={this.setTotal()}/>
            </table>
            <CardButtonGroup onAddNew={this.showModal} 
                             onDeletePortfolio={this.onDelete}
                             onRemoveSelected={this.handleRemoveSelected}
                            />
          </div>
        )
      }
}

class TableStock extends React.Component {
  render() {
    const {data, onSelect, id, currency} = this.props;
    return (
      <tr>
        <td>{data.stock}</td>
        <td>{data.value[0]} {currency}</td>
        <td>{data.amount}</td>
        <td>{(data.total).toFixed(2)} {currency}</td>
        <td><input type="checkbox" name={id} value={data.stock} onChange={onSelect} checked={data.checked}/></td>
      </tr>
    )
  }
}

const TableHeader = () => {
  return (
    <thead>
      <tr className='tableHead'>
        <th>Symbol</th>
        <th>Unit Value</th>
        <th>Quantity</th>
        <th>Total Value</th>
        <th>Selected</th>
      </tr>
    </thead>
  )
}

const TableFooter = (props) => {
  return (
    <tfoot className="tableFooter">
      <tr>
        <td>Total value of portfolio:{props.total.toFixed(2)}</td>
      </tr>
    </tfoot>
  )
}

export default StockCard;