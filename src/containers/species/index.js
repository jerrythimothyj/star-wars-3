import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import SpecieGraph from '../../components/specie-graph'
import SpecieGrid from '../../components/specie-grid';
import Loader from 'react-loader';
import { searchSpecies, isSpecieSearchAllowedFn } from '../../actions';
import { authUser } from '../../services/auth/auth.services';
import { logout } from '../../actions';
import remainingSeconds from '../../services/search/search.services';

let searchKey = '';

export class Specie extends Component {
  constructor(props) {
    super(props);

    if (!authUser()) {
      this.props.logout();
    }

    this.searchKeyChanged = false;

    this.state = {
      specie: '',
      species: [],
      isSearchAllowed: true,
      loaded: true,
      previousAllowed: false,
      nextAllowed: false,
      page: 1,
      remainingSeconds,
      format: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.isWookie = this.isWookie.bind(this);
  }


  componentWillMount() {
    const { specie } = this.state;
    this.init = true;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      // specie: nextProps.specie,
      species: nextProps.species,
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
    this.props.isSpecieSearchAllowedFn(e.target.value);
  }

  navToPage(page) {
    const { specie, format } = this.state;
    this.props.searchSpecies(specie, page, format);
  }

  isWookie(e) {
    const { specie, page } = this.state;
    const format = e.target.checked ? 'wookiee' : '';
    this.props.searchSpecies(specie, page, format);
  }

  render() {
    const {
      specie, species, isSearchAllowed, loaded, previousAllowed, nextAllowed, page, remainingSeconds, format,
    } = this.state;

    if (!isSearchAllowed) {
      searchKey = specie;
      const that = this;
      setTimeout(() => { that.props.isSpecieSearchAllowedFn(searchKey); }, remainingSeconds * 1000);
    }

    if (isSearchAllowed && (this.searchKeyChanged || this.init)) {
      this.props.searchSpecies(specie, page, format);
      this.searchKeyChanged = false;
      this.init = false;
    }

    return (
      <div>
        <div className="row">
          <div className="col"><h1>Search Species</h1></div>
          <div className="col text-right">
             Wookiee<br />
            <label className="switch">
              <input type="checkbox" name="wookiee" onClick={this.isWookie} />
              <span className="slider round" />
            </label>
          </div>
        </div>
        <form name="form">
          <input type="text" className="form-control" name="specie" value={specie} onChange={this.handleChange} disabled={!isSearchAllowed} />
          {!isSearchAllowed &&
          <h3>Please wait for {remainingSeconds} seconds</h3>}
        </form>
        <Loader loaded={loaded} />
        {/* {species} */}
        <SpecieGrid species={species} />
        {/* <SpecieGraph></SpecieGraph> */}
        <div className="text-center">
          { previousAllowed && <span className="next-previous" onClick={() => this.navToPage(page - 1)}><img src="./images/previous.png" /></span> }
          { nextAllowed && <span className="next-previous" onClick={() => this.navToPage(page + 1)}><img src="./images/next.png" /></span> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  specie: state.specie.specie,
  species: state.specie.species,
  isSearchAllowed: state.specie.isSearchAllowed,
  loaded: state.specie.loaded,
  previousAllowed: state.specie.previousAllowed,
  nextAllowed: state.specie.nextAllowed,
  page: state.specie.page,
  remainingSeconds: state.specie.remainingSeconds,
  format: state.specie.format,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  searchSpecies,
  isSpecieSearchAllowedFn,
  logout,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Specie);
