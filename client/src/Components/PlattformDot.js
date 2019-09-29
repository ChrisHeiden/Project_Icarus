import React, { Component } from 'react';
import '../Style/Transition.css';
import '../Style/App.css';
import '../Style/Dot.css';
import '../Style/PlattformDot.css';
import PropTypes from 'prop-types';
import Dot from './Dot'
import Line from './Line'

class PlattformDot extends Component {
    constructor(props){
        super(props);
        this.state = {
           click: false,
           x: 0,
           y: 0,
           diameter: 10,
        };
        this.onClick = this.onClick.bind(this);
        this.calcDistance = this.calcDistance.bind(this);        
        this.calcDots = this.calcDots.bind(this); 
        this.dotClick = this.dotClick.bind(this); 
        this.hideDots = this.hideDots.bind(this); 
        this.time;
    }

    

    refCallback = element => {
        const pos = element.getBoundingClientRect();
        
        this.setState({
            x: pos.x,
            y: pos.y
        },() => {});       
    }

    onClick(){
        if(this.state.click == false)
        {
            this.setState({click: true},() => {});
        }
        else
        {
            this.setState({click: false},() => {});
        }
    }

    calcDistance(){
        let distance = {x: 0, y:0}
        let x = this.props.middleX - this.state.x
        let y = this.props.middleY - this.state.y
        distance.x = x;
        distance.y = y;
        
        return distance;
    }

    dotClick(clickedDate){
        this.props.dotClick(clickedDate.getFullYear());
    }

    hideDots(value){
        this.props.hideDots(value)
    }


    calcDots(distance){
        const dates = this.props.dates;
        const allDates = this.props.allDates;
        var oldYear = dates[0].getFullYear();
        var amount = 1;
        let listItems = dates.map((date, index) =>
            {
                const removeNewDatasetValue = this.props.removeNewDatasetValue;
                const removeOldDatasetValue = this.props.removeOldDatasetValue;
                let dot;
                
                if(this.props.showDistribution == true)
                {
                    if(date.getFullYear() == oldYear && index != dates.length - 1)
                    {
                        amount = amount + 1;
                    }
                    else
                    {
                        if(index == dates.length - 1)
                        {
                            dot = <Dot showDistribution={this.props.showDistribution} width={amount + 10} height={amount + 10} showAllDots={this.props.showAllDots} hideDots={this.hideDots} showAll={false} dotClick={this.dotClick} color={this.props.color} search={true} searchLocation={this.props.searchLocation} key={index} middleX={this.props.middleX} middleY={this.props.middleY} plattformPosX={this.state.x} plattformPosY={this.state.y} location={this.props.locations[index]} date={dates[index]} distance={distance} oldest={this.props.allDates[this.props.allDates.length-1]} newest={this.props.allDates[0]} diameter={amount}></Dot>      
                        }
                        if(index - 1 > 0)
                        {
                            dot = <Dot showDistribution={this.props.showDistribution} width={amount + 10} height={amount + 10} showAllDots={this.props.showAllDots} hideDots={this.hideDots} showAll={false} dotClick={this.dotClick} color={this.props.color} search={true} searchLocation={this.props.searchLocation} key={index} middleX={this.props.middleX} middleY={this.props.middleY} plattformPosX={this.state.x} plattformPosY={this.state.y} location={this.props.locations[index - 1]} date={dates[index - 1]} distance={distance} oldest={this.props.allDates[this.props.allDates.length-1]} newest={this.props.allDates[0]} diameter={amount}></Dot>      
                        }
                        else
                        {
                            dot = <Dot showDistribution={this.props.showDistribution} width={amount + 10} height={amount + 10} showAllDots={this.props.showAllDots} hideDots={this.hideDots} showAll={false} dotClick={this.dotClick} color={this.props.color} search={true} searchLocation={this.props.searchLocation} key={index} middleX={this.props.middleX} middleY={this.props.middleY} plattformPosX={this.state.x} plattformPosY={this.state.y} location={this.props.locations[0]} date={dates[0]} distance={distance} oldest={this.props.allDates[this.props.allDates.length-1]} newest={this.props.allDates[0]} diameter={amount}></Dot>      
                        }
                        amount = 1;
                        oldYear = date.getFullYear();
                    }
                    return dot;
                }
               
                const allDateIndex = allDates.indexOf(date);
                if(allDateIndex <= removeOldDatasetValue && allDateIndex >= removeNewDatasetValue)
                {
                    if(this.props.searchLocation !== undefined &&
                       this.props.searchLocation !== null && 
                       this.props.locations[index] !== undefined &&
                       this.props.searchLocation.length !== 0)
                    {
                     
                        /* filter location + time */
                        if( this.props.locations[index].length !== 0 &&
                            this.props.locations[index].search(this.props.searchLocation) != -1 && 
                            this.props.filterYear != -1 && 
                            date.getFullYear() == this.props.filterYear)
                        {
                            dot = <Dot width={10} height={10} showAllDots={this.props.showAllDots} hideDots={this.hideDots} showAll={false} dotClick={this.dotClick} color={this.props.color} search={true} searchLocation={this.props.searchLocation} key={index} middleX={this.props.middleX} middleY={this.props.middleY} plattformPosX={this.state.x} plattformPosY={this.state.y} location={this.props.locations[index]} date={date} distance={distance} oldest={this.props.allDates[this.props.allDates.length-1]} newest={this.props.allDates[0]} diameter={this.state.diameter}></Dot>      
                        }
                        /* filter only location */
                        else if( this.props.filterYear == -1 && 
                                 date.getFullYear() != this.props.filterYear &&
                                 this.props.locations[index].length != 0 &&
                                 this.props.locations[index].search(this.props.searchLocation) != -1)
                        {
                            dot = <Dot width={10} height={10} showAllDots={this.props.showAllDots} hideDots={this.hideDots} search={false} searchLocation={this.props.searchLocation} key={index} middleX={this.props.middleX} middleY={this.props.middleY} plattformPosX={this.state.x} plattformPosY={this.state.y} location={this.props.locations[index]} date={date} distance={distance} oldest={this.props.allDates[this.props.allDates.length-1]} newest={this.props.allDates[0]} diameter={this.state.diameter}></Dot>
                        }
                        else{}
                    }
                    /* filter only time */
                    else if(this.props.filterYear != -1 && date.getFullYear() == this.props.filterYear)
                    {
                        dot = <Dot width={10} height={10} showAllDots={this.props.showAllDots} hideDots={this.hideDots} showAll={false} dotClick={this.dotClick} color={this.props.color} search={true} searchLocation={this.props.searchLocation} key={index} middleX={this.props.middleX} middleY={this.props.middleY} plattformPosX={this.state.x} plattformPosY={this.state.y} location={this.props.locations[index]} date={date} distance={distance} oldest={this.props.allDates[this.props.allDates.length-1]} newest={this.props.allDates[0]} diameter={this.state.diameter}></Dot>
                    }
                    /* show all */
                    else if(this.props.filterYear == -1 && date.getFullYear() != this.props.filterYear)
                    {
                        dot = <Dot width={10} height={10} showAllDots={this.props.showAllDots} hideDots={this.hideDots} dotClick={this.dotClick} color={this.props.color} search={true} searchLocation={this.props.searchLocation} key={index} middleX={this.props.middleX} middleY={this.props.middleY} plattformPosX={this.state.x} plattformPosY={this.state.y} location={this.props.locations[index]} date={date} distance={distance} oldest={this.props.allDates[this.props.allDates.length-1]} newest={this.props.allDates[0]} diameter={this.state.diameter}></Dot>
                    }           
                }
               
                return dot;
            }  
        )
        return listItems
    }

    calcYearLines(distance){
        const dates = this.props.dates;
        const allDates = this.props.allDates;
        var oldYear = dates[0].getFullYear();
        let listItems = dates.map((date, index) =>
            {
                let dot;
                if(oldYear != date.getFullYear())
                {
                    oldYear = date.getFullYear();
                    dot = <Line width={1} 
                                height={1} 
                                color={this.props.color} 
                                key={index} 
                                middleX={this.props.middleX} 
                                middleY={this.props.middleY} 
                                plattformPosX={this.state.x} 
                                plattformPosY={this.state.y} 
                                date={dates[index]} 
                                distance={distance} 
                                oldest={this.props.allDates[this.props.allDates.length-1]} 
                                newest={this.props.allDates[0]} 
                                year={date.getFullYear() + 1}
                                diameter={this.state.diameter}></Line>
                    return dot;
                }
            }  
        )
        return listItems
    }

    render() {

        if(this.props.gotInformation == false)
        {
            return (
                <div className="loading"></div>
            )
        }
        else
        {
            let distance = this.calcDistance();
          
            let click;

            
            let styles = {
                alignSelf: this.props.alignSelf, 
                justifySelf: this.props.justifySelf, 
                opacity: this.props.opacity,
                width: this.state.diameter + "px",
                height: this.state.diameter + "px",
            };

        
            if(this.state.click == true)
            {
                let textStyle = {
                    position: "relative",
                    left:"70px",
                }
                click = <p style={textStyle} >{this.props.title}</p>
            }

            return (
                <div ref={this.refCallback} className="plattformDot" style={styles}>
                    {click}
                    {this.calcDots(distance)}
                    {this.calcYearLines(distance)}
                </div>
            );
        }        
    }
}


Dot.PlattformDot = {
    dotClick: PropTypes.func,
    hideDots: PropTypes.func
  }

export default PlattformDot;
