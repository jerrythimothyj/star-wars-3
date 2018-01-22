import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import PlanetGraph from '../../components/planet-graph'
import PlanetGrid from '../../components/planet-grid'
import Loader from 'react-loader'
import { searchPlanets, isSearchAllowedFn } from '../../actions'
import { makeViz } from '../../services/graphs/d3/d3-planets.service'
import { authUser } from '../../services/auth/auth.services'
import { logout } from '../../actions'
import { setTimeout } from 'timers';

export class Planet extends Component {
  constructor(props) {
    super(props);

    if(!authUser()) {
      this.props.logout();
    }

    this.searchKeyChanged = false;

    this.state = {
      planet: '',
      planets: [],
      isSearchAllowed: true,
      loaded: true
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.searchKeyChanged = true;
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.props.isSearchAllowedFn(e.target.value);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      planet: nextProps.planet,
      planets: nextProps.planets,
      isSearchAllowed: nextProps.isSearchAllowed,
      loaded: nextProps.loaded
    });
    setTimeout(() => {
      makeViz(nextProps.planets);
    })
  }

  componentWillMount() {
    const { planet } = this.state;
    this.init = true;
  }

  render() {
    const { planet, planets, isSearchAllowed, loaded } = this.state;
    if(isSearchAllowed && ( this.searchKeyChanged || this.init)) {
      this.props.searchPlanets(planet);
      this.searchKeyChanged = false;
      this.init = false;
    }
    
return(
  <div>
      <h1>Search Planets</h1>
      <form name="form">
        <input type="text" className="form-control" name="planet" value={planet} onChange={this.handleChange} disabled={!isSearchAllowed} />
        {!isSearchAllowed && 
        <h3>Please reload the screen to search</h3>}
      </form>
    <Loader loaded={loaded}></Loader>
    {/* {planets} */}
      <PlanetGrid planets={planets}></PlanetGrid>
      <PlanetGraph></PlanetGraph>
  </div>
)
  }
}

const mapStateToProps = state => {
  return ({
    planet: state.planet.planet,
    planets: state.planet.planets,
    isSearchAllowed: state.planet.isSearchAllowed,
    loaded: state.planet.loaded
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  searchPlanets,
  isSearchAllowedFn,
  logout
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Planet)