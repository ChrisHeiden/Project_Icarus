import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Style/line.css';

class Line extends Component {
  
    constructor(props) {
       super(props);
       this.calPosition = this.calPosition.bind(this);
       this.calcXPos = this.calcXPos.bind(this);
       this.calcYPos = this.calcYPos.bind(this);
    }

    calcXPos(procent, middleX, plattformPosX, distance, diameter){
        let x = 0;
        
        if(middleX == plattformPosX)
        {
          const startX = middleX + (diameter/2) - (this.props.width/2);
          x = ((-procent /100)* distance.x) + startX;      
        }
        else
        {
          const startX = middleX + (diameter/2) - (this.props.width/2);
          x = ((-procent /100) * distance.x) + startX;  
        }
        return x;
    }
  
    calcYPos(procent, middleY, plattformPosY, distance, diameter){
        let y = 0;
        if(middleY == plattformPosY)
        {
          const startY = middleY + (diameter/2) - (this.props.height/2);
          y = ((-procent /100)* distance.y) + startY;       
        }
        else
        {
          const startY = middleY + (diameter/2) - (this.props.height/2);
          y = ((-procent /100)* distance.y) + startY;  
        }
  
        return y;
    }
  
    calPosition(middleX, middleY, plattformPosX, plattformPosY, distance, oldest, newest, date, diameter){
        let point = {
            x: 0,
            y: 0,
        };
  
        var actualPost = date
        var oldestPost = oldest
        var newestPost = newest
  
      
  
        let procent = ((actualPost.getTime() - oldestPost.getTime()) * 100) / (newestPost.getTime() - oldestPost.getTime());
    
        const y = this.calcYPos(procent, middleY, plattformPosY, distance, diameter);
        const x = this.calcXPos(procent, middleX, plattformPosX, distance, diameter);
      
        point.x = x;
        point.y = y;

        return point;
    }

    render() {

        const point = this.calPosition(this.props.middleX, 
            this.props.middleY,
            this.props.plattformPosX,
            this.props.plattformPosY,
            this.props.distance,
            this.props.oldest,                       
            this.props.newest,
            this.props.date,
            this.props.diameter);

        let offsetX = point.x - this.props.middleX;   
        let offsetY = point.y - this.props.middleY;

        const point2 =
        {
            x: this.props.middleX - offsetX,
            y: point.y
        }

        const point3 =
        {
            x: this.props.middleX,
            y: this.props.middleY - offsetY,
        }

        var pStyle = {
            position: "absolute",
            top: point.y + 10, 
            left: this.props.middleX - 15,
            color: "#fff"
        };

        return (
        <React.Fragment>
            <div>
                <svg className="svgArea">
                    <line className="line" x1={point.x} y1={point.y} x2={point2.x} y2={point2.y}/>
                    <line className="line" x1={point.x} y1={point.y} x2={point3.x} y2={point3.y}/>
                    <line className="line" x1={point2.x} y1={point2.y} x2={point3.x} y2={point3.y}/>
                </svg>
                <p style={pStyle}>
                    {this.props.year}
                </p>
            </div>
          
        </React.Fragment>
        );
  }
}

Line.propTypes = {
}

export default Line;
