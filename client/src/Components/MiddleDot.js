import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/Dot.css';
import PlattformDot from './PlattformDot'

class MiddleDot extends Component {
    constructor(props){
        super(props);
        this.state = {
           x: 0,
           y: 0,
           diameter: 1,
           dates: [],

           twitterLocations: [],
           twitterDates: [],

           tumblrLocations: [],
           tumblrDates: [],

           flickrLocations: [],
           flickrDates: [],   
           gotInformation: false,  
           timeSearch: -1,   
        };
        this.dotClick = this.dotClick.bind(this); 
        this.hideDots = this.hideDots.bind(this);
        this.sortbyTime = this.sortbyTime.bind(this);
    }

    refCallback = element => {
        const pos = element.getBoundingClientRect();
        this.setState({x: pos.x, y: pos.y},() => {});                
    }

    async componentDidMount() {
        let twitterDates = [];
        let tumblrDates = [];
        let flickrDates = [];

        let twitterLocations = [];
        let tumblrLocations = [];
        let flickrLocations = [];

        /********TWITTER**********/
        let response = await fetch('/twitter');
        let twitterData = await response.json()
        let size = twitterData.length;
        for(let x = 0; x < size; ++x)
        {
            twitterDates.push(new Date(twitterData[x].user.created_at));
            twitterLocations.push(twitterData[x].user.location);
        }    


        /********TUMBLR**********/
        response = await fetch('/tumblr');
        let tumblrData = await response.json()
        size = tumblrData.length;
        for(let x = 0; x <size; ++x)
        {
            tumblrDates.push(new Date(tumblrData[x].date));
            tumblrLocations.push(tumblrData[x].location);
        }


        /********FLICKR**********/
        response = await fetch('/flickr');
        let flickrData = await response.json()
        size = flickrData.length;
        for(let x = 0; x < size; ++x)
        {
            flickrDates.push(new Date(flickrData[x].photo.dates.taken));
            flickrLocations.push(flickrData[x].photo.owner.location);
        }   
        this.sortbyTime(flickrDates);
        this.sortbyTime(tumblrDates);
        this.sortbyTime(twitterDates);


        /*Combine all datasets*/
        var flickrTwitter = flickrDates.concat(twitterDates); 
        var allDate = flickrTwitter.concat(tumblrDates); 
        this.sortbyTime(allDate);

        this.setState({
            twitterDates: twitterDates,
            tumblrDates: tumblrDates,
            flickrDates: flickrDates,

            twitterLocations: twitterLocations,
            tumblrLocations: tumblrLocations,
            flickrLocations: flickrLocations,

            dates: allDate,
            gotInformation: true,
        }, () =>{
            this.props.getAmountOfDots(this.state.dates.length);
        });
    };

    sortbyTime(array){
        array.sort((a,b) => { return b.getTime() - a.getTime();});
    }

    dotClick(clickedDate){
        this.setState({timeSearch: clickedDate},() => {});
    }

    
    hideDots(value){
        this.props.hideDots(value)
    }

    render() { 
        var opacityTwitter;       
        var opacityInstagram;       
        var opacityTumblr;      

        let styles = {
            alignSelf: this.props.alignSelf, 
            justifySelf: this.props.justifySelf, 
            opacity: this.props.opacity,
            width: this.state.diameter + "px",
            height: this.state.diameter + "px",
        };
      

        if(this.props.tumblr == true){ opacityTumblr = 1; }
        else{ opacityTumblr = 0; }

        if(this.props.twitter == true){ opacityTwitter = 1; }
        else { opacityTwitter = 0;}

        if(this.props.instagram ==  true){ opacityInstagram = 1;}
        else { opacityInstagram = 0;}
    
        return (
            <div className="infoVisGridPos dotPos gridVis">
                <div ref={this.refCallback} className="plattformDot" style={styles}></div>

                <PlattformDot 
                    showDistribution={this.props.showDistribution}
                    hideDots={this.hideDots} 
                    showAllDots={this.props.showAllDots}
                    filterYear={this.props.filterYear}
                    timeSearch={this.state.timeSearch}
                    dotClick={this.dotClick}
                    showAllLocations={this.props.showAllLocations} 
                    searchLocation={this.props.searchLocation} 
                    removeNewDatasetValue={this.props.removeNewDatasetValue}
                    removeOldDatasetValue={this.props.removeOldDatasetValue} 
                    alignSelf="end" 
                    justifySelf="end" 
                    opacity={opacityTwitter} 
                    title="Twitter" 
                    color={"#1DA1F2"}
                    middleX={this.state.x}
                    middleY={this.state.y}
                    allDates={this.state.dates}
                    dates={this.state.twitterDates}
                    locations={this.state.twitterLocations}
                    gotInformation={this.state.gotInformation}
                    />

                <PlattformDot 
                    showDistribution={this.props.showDistribution}
                    hideDots={this.hideDots} 
                    showAllDots={this.props.showAllDots}
                    filterYear={this.props.filterYear}
                    timeSearch={this.state.timeSearch}
                    dotClick={this.dotClick}
                    showAllLocations={this.props.showAllLocations} 
                    searchLocation={this.props.searchLocation} 
                    removeNewDatasetValue={this.props.removeNewDatasetValue} 
                    removeOldDatasetValue={this.props.removeOldDatasetValue} 
                    alignSelf="start" 
                    justifySelf="center"
                    opacity={opacityTumblr}
                    title="Tumblr" 
                    color={"#001A35"}
                    middleX={this.state.x} 
                    middleY={this.state.y}
                    allDates={this.state.dates}
                    dates={this.state.tumblrDates}
                    locations={this.state.tumblrLocations}
                    gotInformation={this.state.gotInformation}
                    />

                <PlattformDot 
                    showDistribution={this.props.showDistribution}
                    hideDots={this.hideDots} 
                    showAllDots={this.props.showAllDots}
                    filterYear={this.props.filterYear}
                    timeSearch={this.state.timeSearch}
                    dotClick={this.dotClick}
                    showAllLocations={this.props.showAllLocations} 
                    searchLocation={this.props.searchLocation} 
                    removeNewDatasetValue={this.props.removeNewDatasetValue} 
                    removeOldDatasetValue={this.props.removeOldDatasetValue} 
                    alignSelf="end" 
                    justifySelf="start" 
                    opacity={opacityInstagram}
                    title="Flickr" 
                    color={"#FF0085"}
                    middleX={this.state.x}
                    middleY={this.state.y}
                    allDates={this.state.dates}
                    dates={this.state.flickrDates}
                    locations={this.state.flickrLocations}
                    gotInformation={this.state.gotInformation}
                    />    
            </div>
        ); 
    }
}

MiddleDot.propTypes = {
    getAmountOfDots: PropTypes.func,
    hideDots: PropTypes.func
 }

export default MiddleDot;
