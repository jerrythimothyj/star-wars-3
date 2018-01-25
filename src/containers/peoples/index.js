import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { PeopleGrid } from '../../components/people-grid';
import { searchPeoples, isPeopleSearchAllowedFn, logout } from '../../actions';
import { authUser } from '../../services/auth/auth.services';
import remainingSeconds from '../../services/search/search.services';

let searchKey = '';

export class People extends Component {
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
      remainingSeconds,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.init = true;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      // people: nextProps.people,
      peoples: nextProps.peoples,
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
    this.props.isPeopleSearchAllowedFn(e.target.value);
  }

  navToPage(page) {
    const { people } = this.state;
    this.props.searchPeoples(people, page);
  }

  render() {
    const {
      people, peoples, isSearchAllowed, loaded, previousAllowed, nextAllowed, page, remainingSeconds,
    } = this.state;

    if (!isSearchAllowed) {
      searchKey = people;
      const that = this;
      setTimeout(() => { that.props.isPeopleSearchAllowedFn(searchKey); }, remainingSeconds * 1000);
    }

    if (isSearchAllowed && (this.searchKeyChanged || this.init)) {
      this.props.searchPeoples(people, page);
      this.searchKeyChanged = false;
      this.init = false;
    }

    return (
      <div>
        <h1>Search Peoples</h1>
        <form name="form">
          <input type="text" className="form-control" name="people" value={people} onChange={this.handleChange} disabled={!isSearchAllowed} />
          {!isSearchAllowed &&
          <h3>Please wait for {remainingSeconds} seconds</h3>}
        </form>
        <Loader loaded={loaded} />
        {/* {peoples} */}
        <PeopleGrid peoples={peoples} />
        {/* <PeopleGraph></PeopleGraph> */}
        <div className="text-center">
          { previousAllowed && <span className="next-previous" onClick={() => this.navToPage(page - 1)}><img src="./images/previous.png" /></span> }
          { nextAllowed && <span className="next-previous" onClick={() => this.navToPage(page + 1)}><img src="./images/next.png" /></span> }
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
