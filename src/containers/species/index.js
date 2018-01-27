import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { SpecieGrid } from '../../components';
import { searchSpecies, isSpecieSearchAllowedFn, logout } from '../../actions';
import { authUser, secondsMax } from '../../services';

let searchKey = '';

class Specie extends Component {
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
      remainingSeconds: secondsMax,
      format: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.isWookie = this.isWookie.bind(this);
  }


  componentWillMount() {
    const { specie, page, format } = this.state;
    this.props.searchSpecies(specie, page, format);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      species: nextProps.species,
      isSearchAllowed: nextProps.isSearchAllowed,
      loaded: nextProps.loaded,
      previousAllowed: nextProps.previousAllowed,
      nextAllowed: nextProps.nextAllowed,
      page: nextProps.page,
      remainingSeconds: nextProps.remainingSeconds,
      format: nextProps.format,
    });

    if (!nextProps.isSearchAllowed) {
      searchKey = nextProps.specie;
      const that = this;
      setTimeout(() => { that.props.isSpecieSearchAllowedFn(searchKey); }, nextProps.remainingSeconds * 1000);
    }

    if (nextProps.isSearchAllowed && this.searchKeyChanged) {
      this.props.searchSpecies(nextProps.specie, 1, nextProps.format);
      this.searchKeyChanged = false;
    }
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
      specie,
      species,
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
          <div className="col"><h1>Search Species</h1></div>
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
            name="specie"
            value={specie}
            onChange={this.handleChange}
            disabled={!isSearchAllowed}
          />
          {!isSearchAllowed &&
          <h3>Please wait for {remainingSeconds} seconds</h3>}
        </form>
        <Loader color="#FFF" loaded={loaded} />
        <SpecieGrid species={species} />
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
