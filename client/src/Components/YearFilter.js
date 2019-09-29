import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Style/Button.css';

class YearFilter extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            textValue: "",            
            isNumber: true,     
            check: true,                   
        };
        this.handleText = this.handleText.bind(this);
        this.filterYear = this.filterYear.bind(this);
        this.regExp = new RegExp('^[0-9]*$');
        this.removeTimeFilter = this.removeTimeFilter.bind(this);
    }     
    
    handleText(event) {
        if(event.target.value.match(this.regExp))
        {
            this.setState({textValue: event.target.value, isNumber: true},() => {});
        }
        else
        {
            this.setState({isNumber: false},() => {});
        }
    }

    filterYear(){
        this.setState({ check: false},() => { this.props.searchYear(this.state.textValue) });
    }

    removeTimeFilter(){
        if(this.state.check == false){
            this.setState({textValue: "",
                           check: true}, () => {this.props.searchYear(-1);});
        }
    }


    render() {
        let placeholder;

        if(this.state.isNumber){
            placeholder = "Filter by year....";
        }
        else
        {
            placeholder = "It's not a number";

        }

        return (
            <div className="field">
                <input type="text" 
                    value={this.state.textValue} 
                    onChange={this.handleText}
                    onKeyPress={this.enter}
                    placeholder={placeholder}/>
                <div className="button" onClick={this.filterYear}><p>Search</p></div>         
                <input
                    type="checkbox"
                    checked={!this.props.timeSearch}
                    onClick={this.removeTimeFilter} />    
            </div>
        );
    }
}


YearFilter.propTypes = {
    searchYear: PropTypes.func,
    removeTimeSearch: PropTypes.func
}

export default YearFilter;