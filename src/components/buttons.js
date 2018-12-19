import React from 'react';
import './buttons.css';

class CardButtonGroup extends React.Component {
    constructor(props) {
        super(props);
        this.addStockClick = props.addStockClick;
        this.viewGraphClick = props.viewGraphClick;
        this.removeStockClick = props.removeStockClick;
        this.deletePortfolioClick = props.deletePortfolioClick;
    }
    render() {
        return (
             <div className="buttonGroupDiv">
                <CardButton onClick={this.addStockClick} buttonId="addStock" buttonText="Add stock"/>
                <CardButton onClick={this.viewGraphClick} buttonId="viewGraph" buttonText="View graph"/>
                <CardButton onClick={this.removeStockClick} buttonId="removeStock" buttonText="Remove stock"/>
                <CardButton onClick={this.deletePortfolioClick} buttonId="deletePortfolio" buttonText="Delete portfolio"/>
             </div>
        );
    }
} 

const CardButton = ({onClick, buttonId, buttonText}) => (
    <button id={buttonId} onClick={onClick}>{buttonText}</button>
);

export {CardButton, CardButtonGroup};