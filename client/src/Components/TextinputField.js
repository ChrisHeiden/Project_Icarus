import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Style/TextinputField.css';

class TextinputField extends Component {
    constructor(props){
        super(props);
        this.state = {
            textValue: "",            
            check: true,            
            isText: true,            
        };
        this.handleText = this.handleText.bind(this);
        this.searchLocation = this.searchLocation.bind(this);
        this.onClickCheckbox = this.onClickCheckbox.bind(this);
        this.removeLocationFilter = this.removeLocationFilter.bind(this);
        this.regExp = new RegExp('^[a-zA-Z-]*$');
    } 
    
    componentWillReceiveProps(){
        if(this.state.check == false)
        {
        }
    }
    
    
    handleText(event) {
        if(event.target.value.match(this.regExp))
        {
            this.setState({textValue: event.target.value, isText: true},() => {});
        }
        else
        {
            this.setState({isText: false},() => {});
        }
    }

    searchLocation(){
        this.onClickCheckbox();
        this.props.searchLocation(this.state.textValue);
    }

    onClickCheckbox(){
        if(this.state.check == true){
            this.setState({check: false}, () => {});
        }
    }

    removeLocationFilter(){
        if(this.state.check == false){
            this.setState({textValue: "",
                           check: true}, () => {this.props.removeLoctionSearch();});
        }
    }

    render() {
        let placeholder;

        if(this.state.isText){
            placeholder = "Find Location name ...";
        }
        else
        {
            placeholder = "It's not word";

        }

        return (
            <div className="field">
                <input type="text" 
                       value={this.state.textValue} 
                       onChange={this.handleText}
                       onKeyPress={this.enter}
                       placeholder={placeholder}/>
                <div className="button" onClick={this.searchLocation}><p>Search</p></div>
                <input
                    type="checkbox"
                    checked={!this.props.locationSearch}
                    onClick={this.removeLocationFilter}  />            
            </div>
        );
    }
}

TextinputField.propTypes = {
    searchLocationData: PropTypes.func,
    removeLoctionSearch: PropTypes.func
}


export default TextinputField;