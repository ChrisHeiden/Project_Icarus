import React, { Component } from 'react';
import '../Style/InputBox.css';
import '../Style/General.css';

class InfoBox extends Component {
    
    constructor(props){
        super(props);
    } 

    render() {
        return (
            <div className="infoBoxGridPos box">
                <h1>About the App</h1>
                <div className="line"></div>
                <p className="focusField">
                    In this project, we try to visualize platform data. In this specific case, the server 
                    gets Twitter, Flickr and Tumblr data about a specific tag.
                    <br></br>            
                    The project is called Icarus. This name is specifically chosen by the programmer. Icarus 
                    tried to escape the Labyrint with wing out of wax. However, the fly too near the sun, 
                    and so he falls and died. The same happens with our economy. We try to maximize our economy 
                    all the time without thinking about the danger. One of the results is climate change and if 
                    we don't care, we will also fall.
                </p>
            </div>
        );
    }
}

export default InfoBox;