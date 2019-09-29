import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../Style/App.css';

class SearchBox extends Component {
    constructor(props){
        super(props);
        this.state ={
            clicked: false,
        };
        
        this.isChecked = this.isChecked.bind(this);
        this.boxClass = ["underline"];
    }

    isChecked()
    { 
        if(this.state.clicked == true)
        {
            this.setState({
                clicked: false,
            },() => {});
            this.boxClass.push('animateLineOff');
        }
        else
        {
            this.setState({
                clicked: true,
            },() => {});
            this.boxClass.push('animateLineOn');
        }
        this.props.sendTag(this.props.title)
    }
 
    render() {
        let style = {
            gridColumnStart: this.props.gridColumnStart, 
            gridColumnEnd: this.props.gridColumnEnd,
            gridRowStart: this.props.gridRowStart,
            gridRowEnd: this.props.gridRowEnd,
        }

        return (
            <div style={style}>
                <h1 onClick={this.isChecked}>{this.props.title}</h1>
                <div className={this.boxClass.join(' ')} ></div>
            </div>
        );
    }
}

SearchBox.propTypes = {
    sendTag: PropTypes.func
 }

export default SearchBox;
