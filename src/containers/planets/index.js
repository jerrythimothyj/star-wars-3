import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { PlanetGrid } from '../../components';
import { searchPlanets, isPlanetSearchAllowedFn, logout } from '../../actions';
import { authUser, secondsMax } from '../../services';

let searchKey = '';

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
    this.init = true;
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
  }

  handleChange(e) {
    this.searchKeyChanged = true;
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.props.isPlanetSearchAllowedFn(e.target.value);
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
      format,
    } = this.state;

    if (!isSearchAllowed) {
      searchKey = planet;
      const that = this;
      setTimeout(() => { that.props.isPlanetSearchAllowedFn(searchKey); }, remainingSeconds * 1000);
    }

    if (isSearchAllowed && (this.searchKeyChanged || this.init)) {
      this.props.searchPlanets(planet, page, format);
      this.searchKeyChanged = false;
      this.init = false;
    }

    return (
      <div>
        <div className="row">
          <div className="col"><h1>Search Planets</h1></div>
          <div className="col text-right">
            Wookiee<br />
            <label htmlFor="wookiee" className="switch">
              <input type="checkbox" name="wookiee" onClick={this.isWookie} />
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
        <Loader loaded={loaded} />
        <PlanetGrid planets={planets} />
        <div className="text-center">
          { previousAllowed &&
          <span
            role="button"
            tabIndex="0"
            className="next-previous"
            onClick={() => this.navToPage(page - 1)}
            onKeyDown={this.handleKeyDown}
          ><img src="./images/previous.png" alt="" />
          </span> }
          { nextAllowed &&
            <span
              role="button"
              tabIndex="0"
              className="next-previous"
              onClick={() => this.navToPage(page + 1)}
              onKeyDown={this.handleKeyDown}
            ><img src="./images/next.png" alt="" />
            </span> }
        </div>
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
