import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { PlanetGrid, NextPrevious } from '../../components';
import { searchPlanets, isPlanetSearchAllowedFn, logout } from '../../actions';
import { authUser, secondsMax } from '../../services';

let searchKey = '';
let timer = null;

class Planet extends Component {
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
      remainingSeconds: secondsMax,
      format: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.isWookie = this.isWookie.bind(this);
  }


  componentWillMount() {
    const { planet, page, format } = this.state;
    this.props.searchPlanets(planet, page, format);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      planets: nextProps.planets,
      isSearchAllowed: nextProps.isSearchAllowed,
      loaded: nextProps.loaded,
      previousAllowed: nextProps.previousAllowed,
      nextAllowed: nextProps.nextAllowed,
      page: nextProps.page,
      remainingSeconds: nextProps.remainingSeconds,
      format: nextProps.format,
    });

    if (!nextProps.isSearchAllowed) {
      searchKey = nextProps.planet;
      const that = this;
      setTimeout(
        () => { that.props.isPlanetSearchAllowedFn(searchKey); },
        nextProps.remainingSeconds * 1000,
      );
    }

    if (nextProps.isSearchAllowed && this.searchKeyChanged) {
      this.props.searchPlanets(nextProps.planet, 1, nextProps.format);
      this.searchKeyChanged = false;
    }
  }

  handleChange(e) {
    this.searchKeyChanged = true;
    const { name, value } = e.target;
    this.setState({ [name]: value });
    // this.props.isPlanetSearchAllowedFn(e.target.value);
    const that = this;
    searchKey = e.target.value;

    clearTimeout(timer);
    timer = setTimeout(
      () => { that.props.isPlanetSearchAllowedFn(searchKey); },
      500,
    );
  }

  navToPage(page) {
    const { planet, format } = this.state;
    this.props.searchPlanets(planet, page, format);
  }

  isWookie(e) {
    const { planet, page } = this.state;
    const format = e.target.checked ? 'wookiee' : '';
    this.props.searchPlanets(planet, page, format);
  }

  render() {
    const {
      planet,
      planets,
      isSearchAllowed,
      loaded,
      previousAllowed,
      nextAllowed,
      page,
      remainingSeconds,
    } = this.state;

    return (
      <div>
        <div className="row">
          <div className="col"><h1>Search Planets</h1></div>
          <div className="col text-right">
            Wookiee<br />
            <label htmlFor="wookiee" className="switch">
              <input type="checkbox" name="wookiee" id="wookiee" onClick={this.isWookie} />
              <span className="slider round" />
            </label>
          </div>
        </div>

        <form name="form">
          <input
            type="text"
            className="form-control"
            name="planet"
            value={planet}
            onChange={this.handleChange}
            disabled={!isSearchAllowed}
          />
          {!isSearchAllowed &&
          <h3>Please wait for {remainingSeconds} seconds</h3>}
        </form>
        <Loader color="#FFF" loaded={loaded} />
        <PlanetGrid planets={planets} />
        <NextPrevious
          previousAllowed={previousAllowed}
          nextAllowed={nextAllowed}
          page={page}
          navToPage={pageNo => this.navToPage(pageNo)}
        />
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
  remainingSeconds: state.planet.remainingSeconds,
  format: state.planet.format,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  searchPlanets,
  isPlanetSearchAllowedFn,
  logout,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Planet);
