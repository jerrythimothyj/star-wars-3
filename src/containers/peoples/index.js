import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { PeopleGrid, NextPrevious } from '../../components';
import { searchPeoples, isPeopleSearchAllowedFn, logout } from '../../actions';
import { authUser, secondsMax } from '../../services';

let searchKey = '';
let timer = null;

class People extends Component {
  constructor(props) {
    super(props);

    if (!authUser()) {
      this.props.logout();
    }

    this.searchKeyChanged = false;

    this.state = {
      people: '',
      peoples: [],
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
    const { people, page, format } = this.state;
    this.props.searchPeoples(people, page, format);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      peoples: nextProps.peoples,
      isSearchAllowed: nextProps.isSearchAllowed,
      loaded: nextProps.loaded,
      previousAllowed: nextProps.previousAllowed,
      nextAllowed: nextProps.nextAllowed,
      page: nextProps.page,
      remainingSeconds: nextProps.remainingSeconds,
      format: nextProps.format,
    });

    if (!nextProps.isSearchAllowed) {
      searchKey = nextProps.people;
      const that = this;
      setTimeout(
        () => { that.props.isPeopleSearchAllowedFn(searchKey); },
        nextProps.remainingSeconds * 1000,
      );
    }

    if (nextProps.isSearchAllowed && this.searchKeyChanged) {
      this.props.searchPeoples(nextProps.people, 1, nextProps.format);
      this.searchKeyChanged = false;
    }
  }

  handleChange(e) {
    this.searchKeyChanged = true;
    const { name, value } = e.target;
    this.setState({ [name]: value });
    // this.props.isPeopleSearchAllowedFn(e.target.value);
    const that = this;
    searchKey = e.target.value;

    clearTimeout(timer);
    timer = setTimeout(
      () => { that.props.isPeopleSearchAllowedFn(searchKey); },
      500,
    );
  }

  navToPage(page) {
    const { people, format } = this.state;
    this.props.searchPeoples(people, page, format);
  }

  isWookie(e) {
    const { people, page } = this.state;
    const format = e.target.checked ? 'wookiee' : '';
    this.props.searchPeoples(people, page, format);
  }

  render() {
    const {
      people,
      peoples,
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
          <div className="col"><h1>Search Peoples</h1></div>
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
            name="people"
            value={people}
            onChange={this.handleChange}
            disabled={!isSearchAllowed}
          />
          {!isSearchAllowed &&
          <h3>Please wait for {remainingSeconds} seconds</h3>}
        </form>
        <Loader color="#FFF" loaded={loaded} />
        <PeopleGrid peoples={peoples} />
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
  people: state.people.people,
  peoples: state.people.peoples,
  isSearchAllowed: state.people.isSearchAllowed,
  loaded: state.people.loaded,
  previousAllowed: state.people.previousAllowed,
  nextAllowed: state.people.nextAllowed,
  page: state.people.page,
  remainingSeconds: state.people.remainingSeconds,
  format: state.people.format,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  searchPeoples,
  isPeopleSearchAllowedFn,
  logout,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(People);
