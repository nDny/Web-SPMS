import React from 'react';
import './buttons.css';

class CardButtonGroup extends React.Component {
    constructor(props) {
        super(props);
        this.onAddNew = props.onAddNew;
        this.viewGraphClick = props.viewGraphClick;
        this.onRemoveSelected = props.onRemoveSelected;
        this.onDeletePortfolio = props.onDeletePortfolio;
    }
    render() {
        return (
             <div className="buttonGroupDiv">
                <CardButton onClick={this.onAddNew} buttonId="addStock" buttonText="Add stock"/>
                <CardButton onClick={this.viewGraphClick} buttonId="viewGraph" buttonText="View graph"/>
                <CardButton onClick={this.onRemoveSelected} buttonId="removeStock" buttonText="Remove selected"/>
                <CardButton onClick={this.onDeletePortfolio} buttonId="deletePortfolio" buttonText="Delete portfolio"/>
             </div>
        );
    }
} 

const CardButton = ({onClick, buttonId, buttonText}) => (
    <button id={buttonId} onClick={onClick}>{buttonText}</button>
);

export {CardButton, CardButtonGroup};