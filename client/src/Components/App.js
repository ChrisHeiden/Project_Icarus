import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import '../Style/App.css';
import Transition from './Transition';
import CheckBox from './CheckBox';
import SearchBox from './SearchBox'

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      gotServerResponse: false,
    };
    this.socket;
    this.sendTag = this.sendTag.bind(this);  
    this.tagTitle = ""; 
  }

  componentDidMount() {
    this.socket = socketIOClient('http://localhost:3000');
    this.socket.on("gotInfo", data => this.setState({ gotServerResponse: data }));
  }


  sendTag(tag){
    if(tag == '#Pollution'){ this.socket.emit('sendTag', "Pollution"); }
    else if(tag == '#ClimateChange'){ this.socket.emit('sendTag', "ClimateChange"); }
    else if(tag == '#Economy'){ this.socket.emit('sendTag', "Economy"); }
    else if(tag == '#SpeciesExtinction'){ this.socket.emit('sendTag', "SpeciesExtinction"); }
    this.tagTitle = tag;
  }

  render() {
    let transition;
    let animation;

    if(this.state.gotServerResponse == true)
    {
      transition = <Transition title = {this.tagTitle}/>
      animation = {
        animationName: 'fadeOut',
        animationDuration: '2s',
        animationTimingFunction: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
        animationIterationCount: '1',
        animationFillMode: 'forwards',
      }; 
    }

    return (
        <div className="generalGrid notSelectable hidingOverflow" onContextMenu={(e)=>  {e.preventDefault(); return false;}}>
          <div style={animation} className={"titleGridPos titleFlexLayout"} >
            <h1 className="climate">Project</h1>
            <h1 className="change"><span/>Icarus</h1>
            <div className="tagBox tagPoxGridPos tagGrid">
              <h1 className="tagSearchTitle">Search a Tag</h1>
              <div className="line"></div>
              <div className="tagGridPos tagSearch tagMenu">
                <SearchBox title={'#ClimateChange'} sendTag={this.sendTag} gridColumnStart="1" gridColumnEnd="1" gridRowStart="1" gridRowEnd="1" />
                <SearchBox title={'#SpeciesExtinction'} sendTag={this.sendTag} gridColumnStart="1" gridColumnEnd="1" gridRowStart="2" gridRowEnd="2" />
                <SearchBox title={'#Economy'} sendTag={this.sendTag} gridColumnStart="1" gridColumnEnd="1" gridRowStart="3" gridRowEnd="3" />
                <SearchBox title={'#Pollution'} sendTag={this.sendTag} gridColumnStart="1" gridColumnEnd="1" gridRowStart="4" gridRowEnd="4" />
              </div>
            </div>
          </div>
          {transition}
        </div>
    );
  }
}

export default App;


