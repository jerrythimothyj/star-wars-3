import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { PeopleGrid } from '../../components/people-grid';
import { searchPeoples, isSearchAllowedFn, logout } from '../../actions';
import { authUser } from '../../services/auth/auth.services';

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
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.searchKeyChanged = true;
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.props.isSearchAllowedFn(e.target.value);
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
    });
  }

  navToPage(page) {
    const { people } = this.state;
    this.props.searchPeoples(people, page);
  }

  render() {
    const {
      people, peoples, isSearchAllowed, loaded, previousAllowed, nextAllowed, page,
    } = this.state;
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
          <h3>Please reload the screen to search</h3>}
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
  searchPeoples,
  isSearchAllowedFn,
  logout,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(People);
