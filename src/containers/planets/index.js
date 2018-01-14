import React, { Component } from 'react'
import {
  makeViz
} from '../../services/graphs/d3/d3-planets.service'

import './planets.css';

class About extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    console.log(makeViz());
return(
  <div>
    <h1>About Us</h1>
    <p>Hello Medium!</p>
    <div id="viz">
        <svg></svg>
    </div>
    
  </div>
)
  }
}

export default About;