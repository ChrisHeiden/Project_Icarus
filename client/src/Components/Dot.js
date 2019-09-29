import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../Style/Dot.css';
import '../Style/App.css';

class Dot extends Component { 

    constructor(props) {
        super(props);
        this.state = {
          clickState: false,
          visible: true,
          hover: false,
          width: 10,
          height: 10,
          click: false,
        }
        this.click = this.click.bind(this);
        this.calPosition = this.calPosition.bind(this);
        this.hoverOff = this.hoverOff.bind(this);
        this.hoverOver = this.hoverOver.bind(this);
        this.initColor = this.props.color;
        this.onClick = this.onClick.bind(this);
        this.rightClick = this.rightClick.bind(this);
    };  

    componentDidUpdate(){
      
    }

    calcXPos(procent, middleX, plattformPosX, distance, diameter){
      let x = 0;
      
      if(middleX == plattformPosX)
      {
        const startX = middleX + ((diameter - this.props.width)/2);
        x = ((-procent /100)* distance.x) + startX;      
      }
      else
      {
        const startX = middleX + ((diameter - this.props.width)/2);
        x = ((-procent /100) * distance.x) + startX;  
      }
      return x;
    }

    calcYPos(procent, middleY, plattformPosY, distance, diameter){
      let y = 0;
      if(middleY == plattformPosY)
      {
        const startY = middleY + ((diameter - this.props.height)/2);
        y = ((-procent /100)* distance.y) + startY;       
      }
      else
      {
        const startY = middleY + ((diameter - this.props.height)/2);
        y = ((-procent /100)* distance.y) + startY;  
      }

      return y;
    }

    calPosition(middleX, middleY, plattformPosX, plattformPosY, distance, oldest, newest, date, diameter){
      let point = {
          x: 0,
          y: 0,
          procent: 0
      };

      var actualPost = date
      var oldestPost = oldest
      var newestPost = newest

    

      let procent = ((actualPost.getTime() - oldestPost.getTime()) * 100) / (newestPost.getTime() - oldestPost.getTime());
      if(procent === Infinity)
      {
        procent = 0;
      }
/*
      if(procent > 100)
      {
        alert(procent);
      }
*/
      const y = this.calcYPos(procent, middleY, plattformPosY, distance, diameter);
      const x = this.calcXPos(procent, middleX, plattformPosX, distance, diameter);
    
      point.x = x;
      point.y = y;
     
      point.procent = procent;

      return point;
    }

    click(){
      if(this.state.clickState === false)
      {
        this.setState({clickState: true},() => {});
      }
      else{
        this.setState({clickState: false},() => {});
      }
    }

    hoverOver(){
      this.setState({hover: true},() => {});
    }

    hoverOff(){
      this.setState({hover: false},() => {});
    }

    onClick(){
      this.setState({hover: true},() => {this.props.dotClick(this.props.date);}); 
    }

    rightClick(event){
      if(event.button === 2){
        if(this.state.hover === true){ 
          this.setState({visible: false}, () => {this.props.hideDots(true)})
        }
      }
    }

    render() {
      if(this.props.plattformPosX == 0 || this.props.plattformPosY == 0 )
      {
        return(
          <React.Fragment></React.Fragment>
        )
      }
      else
      {
        const point = this.calPosition(this.props.middleX, 
                                      this.props.middleY,
                                      this.props.plattformPosX,
                                      this.props.plattformPosY,
                                      this.props.distance,
                                      this.props.oldest,                       
                                      this.props.newest,
                                      this.props.date,
                                      this.props.diameter)
        let stylesDot;
        if(this.state.hover === true ){
          stylesDot = {
            width: this.props.width,
            height: this.props.height,
            top: point.y,
            left: point.x,
            background: 'white',
            opacity: (point.procent / 100)
          };
        }
        else{
          stylesDot = {
            width: this.props.width,
            height: this.props.height,
            top: point.y,
            left: point.x,
            background: this.initColor,
            opacity: (point.procent / 100)
          };
        }
        let stylesText = {
          top: point.y - this.props.diameter/2,
          left: point.x + this.props.diameter + this.props.diameter/2,
        };
        if(this.state.visible == false && this.props.showAllDots == false)   
        {
          const pair = {display: 'none'};
          stylesDot = {...stylesDot, ...pair};
          stylesText = {...stylesText, ...pair};
        }
        else{
          const pair = {display: 'block'};
          stylesDot = {...stylesDot, ...pair};
          stylesText = {...stylesText, ...pair};
        }
        

        

        let info;

        if(this.state.clickState === true || this.state.hover === true)
        {
          info = <div className="showInfos"><p>{this.props.location}</p><p>{this.props.date.toString()}</p></div>
        }

        if(this.props.showDistribution == true)
        {
          return (
            <div>
              <div 
                  className="absoluteDot" 
                  style={stylesDot}>
              </div>
            </div>
          );
        }
        else
        {
          return (
            <div>
              <div 
                  onClick={this.click}
                  onMouseDown={this.rightClick}
                  onMouseEnter={this.hoverOver}
                  onMouseLeave={this.hoverOff} 
                  className="absoluteDot" 
                  style={stylesDot}>
              </div>
              <div 
                style={stylesText}
                className="hoverInformation">
                {info}
              </div>
            </div>
          );
        }
    }
  }
}


Dot.propTypes = {
  getMainDot: PropTypes.func,
  dotClick: PropTypes.func,
  hideDots: PropTypes.func
}
export default Dot;