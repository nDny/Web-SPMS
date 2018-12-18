import React, { Component } from 'react';
import './table.css';

class PortfolioTable extends Component {
    render() {
        return (
            <div>
                <table>
                    <TableHeader />
                    
                    <TableFooter />
                </table>
            </div>
        );
    }
}

class TableHeader extends Component {
    render() {
        return (
            <thead>
                <tr>
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
                    <td>Total sum:</td>
                    <td>{total}€</td>
                </tr>
            </tfoot>
        );
    }
}

export default PortfolioTable;