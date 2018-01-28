import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { setTimeout, clearTimeout } from 'timers';
import { PlanetGrid, NextPrevious, SearchBox } from '../../components';
import { searchPlanets, isPlanetSearchAllowedFn, resetSearchPlanetCounterFn, logout } from '../../actions';
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
    this.props.resetSearchPlanetCounterFn();
    this.props.isPlanetSearchAllowedFn(planet);
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
        <SearchBox
          toSearch="Search Planets"
          isWookie={e => this.isWookie(e)}
          searchKey={planet}
          searchBox="planet"
          handleChange={e => this.handleChange(e)}
          isSearchAllowed={isSearchAllowed}
          remainingSeconds={remainingSeconds}
        />
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
  resetSearchPlanetCounterFn,
  logout,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Planet);
