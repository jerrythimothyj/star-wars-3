import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  searchPlanets, isSearchAllowedFn
} from '../../actions/planet.actions'
import {
  makeViz
} from '../../services/graphs/d3/d3-planets.service'

import './planets.css';

class Planet extends Component {
  constructor(props) {
    super(props);

    this.searchKeyChanged = false;

    this.state = {
      planet: '',
      planets: [],
      isSearchAllowed: true
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.searchKeyChanged = true;
    const { name, value } = e.target;
    this.setState({ [name]: value });
    const { planet } = this.state;
    // if() {
    //   this.props.searchPlanets(nextProps.planet);
    // }
    this.props.isSearchAllowedFn();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      planet: nextProps.planet,
      planets: nextProps.planets,
      isSearchAllowed: nextProps.isSearchAllowed
    });
  }

  componentWillMount() {
    const { planet } = this.state;
    this.props.searchPlanets(planet);
  }

  render() {
    const { planet, planets, isSearchAllowed } = this.state;
    if(isSearchAllowed && this.searchKeyChanged) {
      this.props.searchPlanets(planet);
      this.searchKeyChanged = false;
    }
    makeViz(planets);
return(
  <div>
    <h1>Search Planets</h1>
    <form name="form">
      <input type="text" className="form-control" name="planet" value={planet} onChange={this.handleChange} />
      {!isSearchAllowed && 
      <h3>Please reload the screen to search</h3>}
    </form>
    <div id="viz">
      <svg></svg>
    </div>
    
  </div>
)
  }
}

const mapStateToProps = state => {
  return ({
    planet: state.planet.planet,
    planets: state.planet.planets,
    isSearchAllowed: state.planet.isSearchAllowed
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  searchPlanets,
  isSearchAllowedFn
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Planet)