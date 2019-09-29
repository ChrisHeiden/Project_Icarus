import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/Dot.css';
import MiddleDot from './MiddleDot'

class InfoVis extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
        this.getAmountOfDots = this.getAmountOfDots.bind(this);
        this.hideDots = this.hideDots.bind(this);

    } 

    getAmountOfDots(number){
        this.props.getAmountOfDots(number);
    }

    hideDots(value){
        this.props.hideDots(value);
    }


    render() {

        return (
            <div className="infoVisGridPos dotPos gridVis">
                <MiddleDot
                    showDistribution={this.props.showDistribution}
                    showAllDots={this.props.showAllDots}
                    hideDots={this.hideDots}  
                    filterYear={this.props.filterYear}
                    getAmountOfDots={this.getAmountOfDots}
                    showAllLocations={this.props.showAllLocations} 
                    twitter={this.props.twitter} 
                    instagram={this.props.instagram}
                    tumblr={this.props.tumblr}
                    searchLocation={this.props.searchLocation} 
                    removeNewDatasetValue={this.props.removeNewDatasetValue} 
                    removeOldDatasetValue={this.props.removeOldDatasetValue} 
                    alignSelf="center" 
                    justifySelf="center" 
                    opacity="1"/>   
            </div>
        );
    }
}

InfoVis.propTypes = {
    getAmountOfDots: PropTypes.func,
    hideDots: PropTypes.func
 }


export default InfoVis;