import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Style/InputBox.css';
import '../Style/General.css';
import Slider from './Slider'
import CheckBox from './CheckBox'
import Button from './DisableButton'
import TextinputField from './TextinputField'
import YearFilter from './YearFilter'

class InputBox extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            twitter: true,
            tumblr: true,
            instagram: true,


            distribution: false,

            timeSearch: false,
            locationSearch: false,
        };        
        this.removeOldDatasets = this.removeOldDatasets.bind(this);
        this.removeNewDatasets = this.removeNewDatasets.bind(this);
        this.searchLocation = this.searchLocation.bind(this);
        this.isChecked = this.isChecked.bind(this);
        this.removeLoctionSearch = this.removeLoctionSearch.bind(this);
        this.searchYear = this.searchYear.bind(this);
        this.showAllDots = this.showAllDots.bind(this);
        this.removeTimeSearch = this.removeTimeSearch.bind(this);
    } 

    removeOldDatasets(number){
        this.props.removeOldDatasets(number);
    }

    removeNewDatasets(number){
        this.props.removeNewDatasets(number);
    }

    isChecked(plattform){

        if(plattform == "Distribution")
        {
            if(this.state.distribution == false)
            {
                this.setState({distribution: true},() => { this.props.showDistribution(this.state.distribution)});
            }
            else
            {
                this.setState({distribution: false},() => { this.props.showDistribution(this.state.distribution)});
            }
        }

        if(plattform == "Tumblr")
        {
            if(this.state.tumblr == false)
            {
                this.setState({tumblr: true},() => { this.props.lookUpPlattform(this.state.tumblr,this.state.twitter,this.state.instagram)});
            }
            else
            {
                this.setState({tumblr: false},() => { this.props.lookUpPlattform(this.state.tumblr,this.state.twitter,this.state.instagram)});
            }
        }
        else if(plattform == "Twitter")
        {
            if(this.state.twitter == false)
            {
                this.setState({twitter: true},() => { this.props.lookUpPlattform(this.state.tumblr,this.state.twitter,this.state.instagram)});
            }
            else
            {
                this.setState({twitter: false},() => { this.props.lookUpPlattform(this.state.tumblr,this.state.twitter,this.state.instagram)});
            }
        }
        else if(plattform == "Flickr")
        {
            if(this.state.instagram == false)
            {
                this.setState({instagram: true},() => { this.props.lookUpPlattform(this.state.tumblr,this.state.twitter,this.state.instagram)});
            }
            else
            {
                this.setState({instagram: false},() => { this.props.lookUpPlattform(this.state.tumblr,this.state.twitter,this.state.instagram)});
            }
        }
    }

    removeLoctionSearch(){
        this.setState({locationSearch: false},() => {this.props.removeLoctionSearch();}); 
    }

    removeTimeSearch(){
        this.setState({timeSearch: false},() => { this.props.removeTimeSearch();});
    }

    
    searchLocation(location) {
        this.setState({locationSearch: true},() => {this.props.searchLocationData(location);});
        
    }

    searchYear(number){
        this.setState({timeSearch: true},() => {this.props.searchYear(number)});
        
    }

    showAllDots(){
        this.setState({locationSearch: false,timeSearch: false},() => {this.props.removeLoctionSearch();this.props.removeTimeSearch();}); 
        this.props.showAllDots(true);
    }

    render() {
        return (
            <div className="box inputBoxGridPos">
                <h1>Filters</h1>
                <div className="line"></div>
                <div className="focusField">
                <div className="spacingFilter">
                        <h3>Remove oldest Datasets</h3>
                        <Slider removeDatasets={this.removeOldDatasets} step={1} min={0} max={this.props.amountFilter} value={this.props.amountFilter}/>
                        <h3>Remove newest Datasets</h3>
                        <Slider removeDatasets={this.removeNewDatasets} step={1} min={0} max={this.props.amountFilter} value={0} />
                    </div>
                   
                    <div className="spacingFilter">
                        <h3>Name of the Locations</h3>
                        <TextinputField locationSearch={this.state.locationSearch} removeLoctionSearch={this.removeLoctionSearch} searchLocation={this.searchLocation}/>
                    </div>

                    <div className="spacingFilter">
                        <h3>Plattform</h3>
                        <div className="checkboxes">
                            <CheckBox initCheck={this.state.twitter} isChecked={this.isChecked} title={"Twitter"}/>
                            <CheckBox initCheck={this.state.tumblr} isChecked={this.isChecked} title={"Tumblr"}/>
                            <CheckBox initCheck={this.state.instagram} isChecked={this.isChecked} title={"Flickr"}/>
                            <CheckBox initCheck={this.state.distribution} isChecked={this.isChecked} title={"Distribution"}/>
                        </div>
                    </div>

                    <div className="spacingFilter">
                        <h3>By Year</h3>
                        <YearFilter timeSearch={this.state.timeSearch} removeTimeSearch={this.removeTimeSearch} searchYear={this.searchYear}/>
                    </div>
                    
                    <div className="spacingButton">
                        <Button hideDots={this.props.hideDots} 
                                showAllDots={this.showAllDots} 
                                timeSearched={this.state.timeSearch}
                                locationSearched={this.state.locationSearch}/>

                    </div>

                </div>
            </div>
        );
    }
}

InputBox.propTypes = {
    getAmount: PropTypes.func,
    lookUpPlattform: PropTypes.func,
    removeLoctionSearch: PropTypes.func,
    removeTimeSearch: PropTypes.func,
    showAllDots: PropTypes.func,
    removeSearch: PropTypes.func,
    visbleDots: PropTypes.func,
    showDistribution: PropTypes.func,
 }

 export default InputBox;