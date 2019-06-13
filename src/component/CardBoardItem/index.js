import React, { Component } from 'react'

export default class CardBoardItem extends Component {
    
  constructor(props) {
    super(props);
    this.setState({
      "styleSheet": this.props.styleSheet
     })
  }
  
  render() {
    const style = {
        ifColorNotActive: {
            backgroundColor: "black",
            width: "50",
            minWidth: "50",
            height : "50",
            margin: "2px",
        },
        ifColorActive: {
            backgroundColor: "white",
            width: "50",
            minWidth: "50",
            height: "50",
            margin: "2px",
        },
    };
    return (
      <span style={this.props.styleSheet == "ifColorActive" ? style.ifColorActive : style.ifColorNotActive }>
        aaa
      </span>
    )
  }
}
