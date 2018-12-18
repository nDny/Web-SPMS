import React, { Component } from 'react';

class PortfolioButton extends React.Component {
    render () {
        return (
            <div>
                <NewButton buttonName="Add new portfolio" id="newportfoliobutton"/>
            </div>
        );
    }

}


function NewButton(props) {
    return (
        <button>{props.buttonName}</button>
    );
}

export {PortfolioButton};