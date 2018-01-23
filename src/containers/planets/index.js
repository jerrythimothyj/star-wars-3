import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import PlanetGraph from '../../components/planet-graph'
import PlanetGrid from '../../components/planet-grid';
import Loader from 'react-loader';
import { searchPlanets, isSearchAllowedFn } from '../../actions';
import { makeViz } from '../../services/graphs/d3/d3-planets.service';
import { authUser } from '../../services/auth/auth.services';
import { logout } from '../../actions';
import { setTimeout } from 'timers';

export class Planet extends Component {
  constructor(props) {
    super(props);

    if (!authUser()) {
      this.props.logout();
    }

    this.searchKeyChanged = false;

    this.state = {
      planet: '',
      planets: [],
      isSearchAllowed: true,
      loaded: true,
      previousAllowed: false,
      nextAllowed: false,
      page: 1,
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
      loaded: nextProps.loaded,
      previousAllowed: nextProps.previousAllowed,
      nextAllowed: nextProps.nextAllowed,
      page: nextProps.page,
    });
    // setTimeout(() => {
    //   makeViz(nextProps.planets);
    // })
  }

  componentWillMount() {
    const { planet } = this.state;
    this.init = true;
  }

  navToPage(page) {
    const { planet } = this.state;
    this.props.searchPlanets(planet, page);
  }

  render() {
    const {
      planet, planets, isSearchAllowed, loaded, previousAllowed, nextAllowed, page,
    } = this.state;
    if (isSearchAllowed && (this.searchKeyChanged || this.init)) {
      this.props.searchPlanets(planet, page);
      this.searchKeyChanged = false;
      this.init = false;
    }

    return (
      <div>
        <h1>Search Planets</h1>
        <form name="form">
          <input type="text" className="form-control" name="planet" value={planet} onChange={this.handleChange} disabled={!isSearchAllowed} />
          {!isSearchAllowed &&
          <h3>Please reload the screen to search</h3>}
        </form>
        <Loader loaded={loaded} />
        {/* {planets} */}
        <PlanetGrid planets={planets} />
        {/* <PlanetGraph></PlanetGraph> */}
        { previousAllowed && <span onClick={() => this.navToPage(page - 1)}>Click Previous</span> }
        { nextAllowed && <span onClick={() => this.navToPage(page + 1)}>Click Next</span> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  planet: state.planet.planet,
  planets: state.planet.planets,
  isSearchAllowed: state.planet.isSearchAllowed,
  loaded: state.planet.loaded,
  previousAllowed: state.planet.previousAllowed,
  nextAllowed: state.planet.nextAllowed,
  page: state.planet.page,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  searchPlanets,
  isSearchAllowedFn,
  logout,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Planet);
