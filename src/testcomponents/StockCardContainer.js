import React, { Component } from 'react';
import StockCard from './stocks.js';
import Modal from './modal.js';
import './modal.css';

class StockCardContainer extends Component {
    state = {
        cards: [],
        show: false,
        portfolioName: ""
    }

    onChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    showModal = () => {
        this.setState({
            show: true
        });
    }

    handleNewPortfolio = () => {
        let tempState = [...this.state.cards];
        tempState.push({portfolioName: this.state.portfolioName});
        this.setState({
            cards: tempState,
            show: false
        })
    }

    handleDeletePortfolio = (id) => {
        this.setState(prevState => ({
            cards: prevState.cards.filter(el => el !== id)
        }))
    }

  render() {
    return (
      <div>
        <button type="button" onClick={this.showModal}>New Portfolio</button>
            <Modal show={this.state.show} handleDone={this.handleNewPortfolio}>
                <p>Enter portfolio name:</p>
                <input type="text" name="portfolioName" onChange={this.onChange}/>
            </Modal>
        {this.state.cards.map((item, key) => {
            return (
                <div key={key}>
                    <StockCard portfolioName={item.portfolioName}
                                onDeletePortfolio={this.handleDeletePortfolio}
                                id={key}
                    />
                </div>
            )
        })}
      </div>
    )
  }
}

export default StockCardContainer;