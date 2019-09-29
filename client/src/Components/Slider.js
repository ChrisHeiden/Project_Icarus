import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Style/InputBox.css';
import '../Style/General.css';
import '../Style/Slider.css';

class InputBox extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            sliderValue: -1,
        };
        this.handleSlider = this.handleSlider.bind(this);
    } 
    componentWillMount() {
        this.setState({sliderValue: this.props.value},() => {});
    }

    handleSlider(event){
        this.setState({sliderValue: event.target.value},() => {this.props.removeDatasets(this.state.sliderValue);});
    }


    render() {
        return (
            <input 
                className="slider"
                type="range" 
                min={this.props.min} max={this.props.max} 
                value={this.state.sliderValue} 
                onChange={this.handleSlider}
                step={this.props.step}/>
        );
    }
}


InputBox.propTypes = {
    removeDatasets: PropTypes.func
 }

export default InputBox;