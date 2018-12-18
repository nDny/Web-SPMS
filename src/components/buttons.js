import React from 'react';
import './buttons.css';

const AddPortfolioButton = ({onClick}) => (
    <button id="addportfoliobutton" onClick={onClick} type="button">Add new portfolio</button>
);

const ButtonGroupButton = ({onClick, idName, buttonText}) => (
    <button id={idName} onClick={onClick} type="button">{buttonText}</button>
);

export {AddPortfolioButton};