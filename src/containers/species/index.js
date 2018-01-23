import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
// import SpecieGraph from '../../components/specie-graph'
import SpecieGrid from '../../components/specie-grid'
import Loader from 'react-loader'
import { searchSpecies, isSearchAllowedFn } from '../../actions'
import { makeViz } from '../../services/graphs/d3/d3-species.service'
import { authUser } from '../../services/auth/auth.services'
import { logout } from '../../actions'
import { setTimeout } from 'timers';

export class Specie extends Component {
  constructor(props) {
    super(props);

    if(!authUser()) {
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
      page: 1
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.searchKeyChanged = true;
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.props.isSearchAllowedFn(e.target.value);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      specie: nextProps.specie,
      species: nextProps.species,
      isSearchAllowed: nextProps.isSearchAllowed,
      loaded: nextProps.loaded,
      previousAllowed: nextProps.previousAllowed,
      nextAllowed: nextProps.nextAllowed,
      page: nextProps.page
    });
    // setTimeout(() => {
    //   makeViz(nextProps.species);
    // })
  }

  componentWillMount() {
    const { specie } = this.state;
    this.init = true;
  }

  navToPage(page) {
    const { specie } = this.state;
    this.props.searchSpecies(specie, page);
  }

  render() {
    const { specie, species, isSearchAllowed, loaded, previousAllowed, nextAllowed, page } = this.state;
    if(isSearchAllowed && ( this.searchKeyChanged || this.init)) {
      this.props.searchSpecies(specie, page);
      this.searchKeyChanged = false;
      this.init = false;
    }
    
return(
  <div>
      <h1>Search Species</h1>
      <form name="form">
        <input type="text" className="form-control" name="specie" value={specie} onChange={this.handleChange} disabled={!isSearchAllowed} />
        {!isSearchAllowed && 
        <h3>Please reload the screen to search</h3>}
      </form>
    <Loader loaded={loaded}></Loader>
    {/* {species} */}
      <SpecieGrid species={species}></SpecieGrid>
      {/* <SpecieGraph></SpecieGraph> */}
      { previousAllowed && <span onClick={() => this.navToPage(page-1)}>Click Previous</span> }
      { nextAllowed && <span onClick={() => this.navToPage(page+1)}>Click Next</span> }
      </div>
)
  }
}

const mapStateToProps = state => {
  return ({
    specie: state.specie.specie,
    species: state.specie.species,
    isSearchAllowed: state.specie.isSearchAllowed,
    loaded: state.specie.loaded,
    previousAllowed: state.specie.previousAllowed,
    nextAllowed: state.specie.nextAllowed,
    page: state.specie.page
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  searchSpecies,
  isSearchAllowedFn,
  logout
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Specie)