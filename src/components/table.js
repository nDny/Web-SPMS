import React, { Component } from 'react';
import './table.css';

class PortfolioTable extends Component {
    stocks = this.props.stocks;
    render() {

        let portfolioTotal = 2;

        return (
            <table className='portfolioTable'>
                <TableHeader />
                <tbody>
                    
                </tbody>
                <TableFooter total={portfolioTotal}/>
            </table>
        );
    }
}

class TableHeader extends Component {
    render() {
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
        );
    }
}


class TableFooter extends Component {
    render() {
        let total = this.props.total;
        if (!total) {
            total = 0;
        }
        return (
            <tfoot>
                <tr>
                    <td>Total sum: {total}€</td>
                </tr>
            </tfoot>
        );
    }
}

export default PortfolioTable;