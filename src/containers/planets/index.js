import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  searchPlanets
} from '../../actions/planet.actions'
import {
  makeViz
} from '../../services/graphs/d3/d3-planets.service'

import './planets.css';

class Planet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planet: '',
      planets: []
    };

    this.handleChange = this.handleChange.bind(this);
    
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    const { planet } = this.state;
    this.props.searchPlanets(value);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      planets: nextProps.planets
    });
  }

  componentWillMount() {
    const { planet } = this.state;
    this.props.searchPlanets(planet);
  }

  render() {
    const { planet, planets } = this.state;

    makeViz(planets);
return(
  <div>
    <h1>Search Planets</h1>
    <form name="form">
      <input type="text" className="form-control" name="planet" value={planet} onChange={this.handleChange} />
    </form>
    <div id="viz">
      <svg></svg>
    </div>
    
  </div>
)
  }
}

const mapStateToProps = state => {
  console.log(state);
  return ({
    planet: state.planet.planet,
    planets: state.planet.planets
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  searchPlanets
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Planet)