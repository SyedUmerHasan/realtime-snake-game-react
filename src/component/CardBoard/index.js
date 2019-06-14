import React, { Component } from 'react'
import CardBoardItem from '../CardBoardItem';
import ArrowKeysReact from 'arrow-keys-react';
import { Alert } from 'antd';



export default class CardBoard extends Component {

    constructor(props,context) {
        super(props);
        let boardArray = [];
        for (let i = 0; i < this.props.boardSize; i++) {

            let dummyArray = [];
            for (let j = 0; j < this.props.boardSize; j++) {
                dummyArray.push('0');
            }
            dummyArray.push(<br />);
            boardArray.push(dummyArray);
        }
        ArrowKeysReact.config({
            left: () => {
            console.log("I am left");
                if (this.state.activeValue_X <= 0) {

                } else {
                    this.setState({
                        activeValue_X: this.state.activeValue_X - 1
                    })
                }
            },
            right: () => {
                console.log("I am right");
                if (this.state.activeValue_X >= this.props.boardSize) {

                } else {
                    this.setState({
                        activeValue_X: this.state.activeValue_X + 1
                    })
                }
            },
            up: () => {
            console.log("I am up");
                if (this.state.activeValue_Y <= 0) {
      
                } else {
                    this.setState({
                        activeValue_Y: this.state.activeValue_Y - 1
                    })
                }
            },
            down: () => {
            console.log("I am down");
                if (this.state.activeValue_Y >= this.props.boardSize-1 )
                {

                }
                else{
                    this.setState({
                        activeValue_Y: this.state.activeValue_Y + 1
                    })
                }
            }
        });

        this.state = {
            content: 'Use arrow keys on your keyboard!',
            colorActive: "false",
            boardSize: this.props.boardSize,
            activeValue_X: 0,
            activeValue_Y: 0,
            boardArray: boardArray,
            xAxisEnemy: this.getRandomInt(19),
            yAxisEnemy: this.getRandomInt(19),
            gameOver : false
        };

    }
    onClose = e => {
        console.log(e, 'I was closed.');
    };


    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }
    render() {
        {console.log(this.state.boardArray)}
        let gameOverPrintArray = <Alert
                message="Error Text"
                description="Error Description Error Description Error Description Error Description Error Description Error Description"
                type="error"
                closable
                onClose={this.onClose}
                />
        var xAxisMovement = this.state.activeValue_X;
        var yAxisMovement = this.state.activeValue_Y;
        var xAxisEnemyMovement = this.state.xAxisEnemy;
        var yAxisEnemyMovement = this.state.yAxisEnemy;
        var boardArray = this.state.boardArray;
        if (yAxisEnemyMovement == yAxisMovement && xAxisEnemyMovement == xAxisMovement)
        {
            if(this.state.gameOver != true)
            {
                this.setState({
                    gameOver : true
                });
            }
            console.log("Game End");
        }
        return (
        <div>

            <div id="alert" >
                {this.state.gameOver == true ? gameOverPrintArray  : null}
            </div>
            <div {...ArrowKeysReact.events} tabIndex="1">


                {this.state.boardArray.map(function (item,index){
                    var myArray = []; 
                    let myItem = item.map(function (newItem,iterator) {
                            // myArray.push(newItem)
                            if (xAxisMovement == iterator || xAxisEnemyMovement == iterator)
                            {
                                if (xAxisMovement == iterator )
                                {
                                    if (index == yAxisMovement ) {   
                                        if (yAxisEnemyMovement == yAxisMovement && xAxisEnemyMovement == xAxisMovement)
                                        {
                                            console.log("Game Over");
                                        }
                                        console.log('====================================');
                                        console.log(index , "=" , xAxisMovement);
                                        console.log(yAxisMovement , "=" , yAxisEnemyMovement);
                                        // console.log(iterator);
                                        console.log('====================================');
                                        // Player
                                        myArray.push (<CardBoardItem {...ArrowKeysReact.events} styleSheet="ifColorActive"/>)
                                    }
                                }
                                else{
                                    myArray.push(<CardBoardItem {...ArrowKeysReact.events} styleSheet="ifColorNotActive"/>)
                                }
                            }
                            else{
                                myArray.push( <CardBoardItem {...ArrowKeysReact.events} styleSheet="ifColorNotActive"/>)
                            }
                    });
                    // console.log(myItem)
                    myArray.push(<br/>)
                    return myArray;
                })}
            </div>
            <h1>X-axis : {xAxisMovement}</h1>
            
            <h1>Y-axis : {yAxisMovement}</h1>



            <h1>The Enemy at X  :  {this.state.xAxisEnemy}  and  Y :  {this.state.yAxisEnemy}</h1>
        </div>

        )
    }
}
