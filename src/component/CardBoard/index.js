import React, { Component } from 'react'
import CardBoardItem from '../CardBoardItem';
import ArrowKeysReact from 'arrow-keys-react';
import { Alert } from 'antd';
import { array } from 'prop-types';



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
                    //  activeValue_X not go less than 0
                } else {
                    this.setState({
                        activeValue_X: this.state.activeValue_X - 1
                    })
                }
            },
            right: () => {
                console.log("I am right");
                if (this.state.activeValue_X >= this.props.boardSize-1) {
                    //  activeValue_X not go greater than 20
                } else {
                    this.setState({
                        activeValue_X: this.state.activeValue_X + 1
                    })
                }
            },
            up: () => {
            console.log("I am up");
                if (this.state.activeValue_Y <= 0) {
                          //  activeValue_Y not go less than 0
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
                    //  activeValue_Y not go graeter than 20
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
            gameOver : false,
            Enemies: this.createRandomEnemies,
        };
    }




    // Creates Random enemies
    createRandomEnemies = () => {
        var Enemies = []
        for (let index = 0; index < 10; index++) {
            let singleEnemy = {
                "xAxisEnemyPosition": this.getRandomInt(19),
                "yAxisEnemyPosition": this.getRandomInt(19)
            }
            Enemies.push(singleEnemy)
        }
        console.log('====================================');
        console.log("I am enemies");
        console.log('====================================');
        return Enemies
    }
    // Closes the Game Over Message that appear on the Top of the Game 
    onClose = e => {
        console.log(e, 'I was closed.');
    };

    componentDidMount() {
        var array = this.createRandomEnemies()
        this.setState({
            Enemies: array
        })
    }

    addingEnemy = (boardArray, enemyPositionArray) => {
        console.log("I am Adding Enemies");
        return boardArray
    }
    updatePositionPlayer = (boardArray, playerPositionArray, enemyPositionArray) => {
        if (Array.isArray(enemyPositionArray) == true)
        {
            boardArray[playerPositionArray.yAxisPlayerPosition][playerPositionArray.xAxisPlayerPosition] = < CardBoardItem {...ArrowKeysReact.events} styleSheet = "ifColorActive"/>
            enemyPositionArray.forEach((enemyItem, EnemyNumber) => {
                boardArray[enemyItem.yAxisEnemyPosition][enemyItem.xAxisEnemyPosition] = < CardBoardItem {...ArrowKeysReact.events}styleSheet = "ifColorActive"/>
            })
            this.checkGameOver(playerPositionArray, enemyPositionArray)
        }
        else{
            
            console.log("This is not an array ")
        }
        return boardArray
    }
    checkGameOver = (playerPositionArray, enemyPositionArray) => {
        console.log('====================================');
        console.log("I am  checking Game Over");
        console.log('====================================');
        enemyPositionArray.forEach((enemyItem, EnemyNumber) => {
            if (enemyItem.xAxisEnemyPosition == this.state.activeValue_X && enemyItem.yAxisEnemyPosition == this.state.activeValue_Y )
            {
                console.log("Game Kahatm")
                this.state.gameOver = true
            }
        })
    }
    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    render() {
        let gameOverPrintArray = <Alert
                message="Game Over"
                description="You spawn with enemy, he killed you."
                type="error"
                closable
                onClose={this.onClose}
                />
        var xAxisMovement = this.state.activeValue_X;
        var yAxisMovement = this.state.activeValue_Y;
        var xAxisEnemyMovement = this.state.xAxisEnemy;
        var yAxisEnemyMovement = this.state.yAxisEnemy;

        var boardArray = this.state.boardArray;

        let boardElementArray = [];
        this.state.boardArray.map(function(item, iterator){
            boardElementArray.push([]);
        });

        this.state.boardArray.map(function (item, index) {
            var myArray = [];
            var length = 0;
            let myItem = item.map(function (newItem, iterator) {
                // Add all array compartments with component to print black box
                boardElementArray[index][iterator] = < CardBoardItem {
                    ...ArrowKeysReact.events
                }
                styleSheet = "ifColorNotActive" / > ;
                length++;
            });
            boardElementArray[index][length] = < br/>
                return myArray;
        })

        // Updating Enemy and Player position in dummy Array 
        boardElementArray = this.updatePositionPlayer(boardElementArray, {
            xAxisPlayerPosition: this.state.activeValue_X,
            yAxisPlayerPosition: this.state.activeValue_Y,
        }, this.state.Enemies)


        return (
        <div>

            <div id="alert" >
                {this.state.gameOver == true ? gameOverPrintArray  : null}
            </div>
            <div {...ArrowKeysReact.events} tabIndex="1">
            {
            }
            {boardElementArray}
            </div>
            <h1>X-axis : {xAxisMovement}</h1>
            
            <h1>Y-axis : {yAxisMovement}</h1>

            <h1>The Enemy at X  :  {this.state.xAxisEnemy}  and  Y :  {this.state.yAxisEnemy}</h1>
        </div>

        )
    }
}
