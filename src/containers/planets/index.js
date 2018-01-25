import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import PlanetGrid from '../../components/planet-grid';
import { searchPlanets, isPlanetSearchAllowedFn, logout } from '../../actions';
import { authUser } from '../../services/auth/auth.services';
import remainingSeconds from '../../services/search/search.services';

let searchKey = '';


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
      remainingSeconds,
    };

    this.handleChange = this.handleChange.bind(this);
  }


  componentWillMount() {
    this.init = true;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      // planet: nextProps.planet,
      planets: nextProps.planets,
      isSearchAllowed: nextProps.isSearchAllowed,
      loaded: nextProps.loaded,
      previousAllowed: nextProps.previousAllowed,
      nextAllowed: nextProps.nextAllowed,
      page: nextProps.page,
      remainingSeconds: nextProps.remainingSeconds,
    });
  }

  handleChange(e) {
    this.searchKeyChanged = true;
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.props.isPlanetSearchAllowedFn(e.target.value);
  }

  navToPage(page) {
    const { planet } = this.state;
    this.props.searchPlanets(planet, page);
  }


  render() {
    const {
      planet, planets, isSearchAllowed, loaded, previousAllowed, nextAllowed, page, remainingSeconds,
    } = this.state;

    if (!isSearchAllowed) {
      searchKey = planet;
      const that = this;
      setTimeout(() => { that.props.isPlanetSearchAllowedFn(searchKey); }, remainingSeconds * 1000);
    }

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
          <h3>Please wait for {remainingSeconds} seconds</h3>}
        </form>
        <Loader loaded={loaded} />
        {/* {planets} */}
        <PlanetGrid planets={planets} />
        {/* <PlanetGraph></PlanetGraph> */}
        <div className="text-center">
          { previousAllowed && <span className="next-previous" onClick={() => this.navToPage(page - 1)}><img src="./images/previous.png" /></span> }
          { nextAllowed && <span className="next-previous" onClick={() => this.navToPage(page + 1)}><img src="./images/next.png" /></span> }
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
