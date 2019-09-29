import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Style/Button.css';

class Button extends Component {
    
    constructor(props){
        super(props);
        this.state = {
        };
        this.onClick = this.onClick.bind(this);
    } 

    onClick(){
        this.props.showAllDots();
    }

    render() {
        
        let style;
        let button;
        if(this.props.timeSearched == false && this.props.locationSearched == false && this.props.hideDots === false) {
            style = {background: '#C4C4C4'}
            button = <div style={style} className="enableButton"> <h3>show all Dots</h3></div> 
              
        }
        else{
            style = {background: 'red',cursor: 'pointer'}
            button = <div style={style} onClick={this.onClick} className="enableButton"> <h3>show all Dots</h3></div>   
        }    

        return (
            <div>
                {button}
            </div>
        );
    }
}


Button.propTypes = {
    showAllDots: PropTypes.func
 }

export default Button;