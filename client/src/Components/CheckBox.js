import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Style/CheckBox.css'

class CheckBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            check: true
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    } 

    componentWillMount(){
        this.setState({check: this.props.initCheck},() => {});
    }

    handleInputChange(event) {
       if(this.state.check == false)
       {
            this.setState({check: true},() => {this.props.isChecked(this.props.title);});
       }
       else
       {
            this.setState({check: false},() => {this.props.isChecked(this.props.title);});
       }
    }


    render() { 
        return (
            <div className="flex">
            <p className="spacing">{this.props.title}</p>
            <input
                    type="checkbox" 
                    checked={this.state.check}
                    onChange={this.handleInputChange} />
            </div>
        );
    }
}

CheckBox.propTypes = {
    isChecked: PropTypes.func
 }


export default CheckBox;