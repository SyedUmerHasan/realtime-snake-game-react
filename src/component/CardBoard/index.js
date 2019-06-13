import React, { Component } from 'react'
import CardBoardItem from '../CardBoardItem';
import ArrowKeysReact from 'arrow-keys-react';

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
            },
            right: () => {
                console.log("I am right");
            },
            up: () => {
            console.log("I am up");
                if (this.state.activeValue_X >= this.props.boardSize) {
      
                } else {
                    this.setState({
                        activeValue_X: this.state.activeValue_X + 1
                    })
                }
            },
            down: () => {
            console.log("I am down");
                if (this.state.activeValue_X <= 0 )
                {

                }
                else{
                    this.setState({
                        activeValue_X: this.state.activeValue_X - 1
                    })
                }
            }
        });

        this.state = {
            content: 'Use arrow keys on your keyboard!',
            colorActive: "false",
            boardSize: this.props.boardSize,
            activeValue_X: 0,
            boardArray: boardArray
        };

    }

    render() {
        {console.log(this.state.boardArray)}
        var a = this.state.activeValue_X;
        return (
        <div>
            <div {...ArrowKeysReact.events} tabIndex="1">


                {this.state.boardArray.map(function (item,index){
                    let myItem = item.map(function (newItem,iterator) {

                        if ( a == iterator)
                        {
                            if (a == iterator == index)
                            {
                                newItem[a] = "0"
                                return <CardBoardItem {...ArrowKeysReact.events} styleSheet="ifColorActive"/>
                            }
                            return <CardBoardItem {...ArrowKeysReact.events} styleSheet="ifColorNotActive"/>
                        }
                        else{
                            return <CardBoardItem {...ArrowKeysReact.events} styleSheet="ifColorNotActive"/>
                        }
                    })
                    console.log(myItem)
                    myItem.push(<br/>)
                    return myItem;
                })}
            </div>
        </div>
        )
    }
}
