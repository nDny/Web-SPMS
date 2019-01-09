import React, { Component } from 'react';
import StockCard from './stocks.js';
import Modal from './modal.js';
import './modal.css';

class StockCardContainer extends Component {
    state = {
        id: 0,
        isFull: false,
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
        if (this.state.cards.length > 9) {
            this.setState({
                isFull: true
            })
        } else {
            this.setState({
                show: true
            });
        }
    }

    resetIsFullModal = () => {
        this.setState({
            isFull: false
        });
    }

    handleNewPortfolio = () => {
        let tempState = [...this.state.cards];
        tempState.push({portfolioName: this.state.portfolioName, id: this.state.id});
        this.setState({
            cards: tempState,
            show: false,
            id: this.state.id + 1
        })
    }

    handleDeletePortfolio = (id) => {
        console.log('id :', id);
        let tempCards = [...this.state.cards];
        tempCards.splice(id, 1);
        for (let i = 0; i < tempCards.length; i++) {
            tempCards[i].id = i;
        }
        console.log('tempCards :', tempCards);
        this.setState({
            cards: tempCards,
            id: this.state.id - 1
        });
        this.forceUpdate();
    }

  render() {
    return (
      <div>
        <button type="button" onClick={this.showModal}>New Portfolio</button>
            <Modal show={this.state.show} handleDone={this.handleNewPortfolio}>
                <p>Enter portfolio name:</p>
                <input type="text" name="portfolioName" onChange={this.onChange}/>
            </Modal>
            <Modal show={this.state.isFull} handleDone={this.resetIsFullModal}>
                <p>Max amount of portfolios is 10</p>
            </Modal>
        {this.state.cards.map((item, key) => {
            return (
                <div key={key}>
                    <StockCard  portfolioName={item.portfolioName}
                                onDeletePortfolio={this.handleDeletePortfolio}
                                id={item.id}
                    />
                </div>
            )
        })}
      </div>
    )
  }
}

export default StockCardContainer;