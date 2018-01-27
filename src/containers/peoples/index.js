import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { PeopleGrid } from '../../components';
import { searchPeoples, isPeopleSearchAllowedFn, logout } from '../../actions';
import { authUser, secondsMax } from '../../services';

let searchKey = '';

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

    if (nextProps.isSearchAllowed && this.searchKeyChanged) {
      this.props.searchPeoples(nextProps.people, 1, nextProps.format);
      this.searchKeyChanged = false;
    }
  }

  handleChange(e) {
    this.searchKeyChanged = true;
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.props.isPeopleSearchAllowedFn(e.target.value);
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

    if (!isSearchAllowed) {
      searchKey = people;
      const that = this;
      setTimeout(() => { that.props.isPeopleSearchAllowedFn(searchKey); }, remainingSeconds * 1000);
    }

    return (
      <div>
        <div className="row">
          <div className="col"><h1>Search Peoples</h1></div>
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
            name="people"
            value={people}
            onChange={this.handleChange}
            disabled={!isSearchAllowed}
          />
          {!isSearchAllowed &&
          <h3>Please wait for {remainingSeconds} seconds</h3>}
        </form>
        <Loader loaded={loaded} />
        <PeopleGrid peoples={peoples} />
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
