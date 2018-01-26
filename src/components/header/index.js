import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  logout,
} from '../../actions';
import { getSessionStorageItem } from '../../services/storage/storage.services';

import './index.css';


export class Header extends Component {
  render() {
    this.isUserLoggedIn = getSessionStorageItem('loggedInUser');

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light header-navbar">
        {/* <a className="navbar-brand">Star Wars</a> */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
          {this.isUserLoggedIn &&
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/planets">Planets</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/peoples">People</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/species">Species</NavLink>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn"
                href="#"
                onClick={() => this.props.logout()}
              >Logout
              </button>
            </li>
          </ul>
          }
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  loginSucceeded: state.user.loginSucceeded,
  loginFailed: state.user.loginFailed,
  logoutSucceeded: state.user.logoutSucceeded,
  logoutFailed: state.user.logoutFailed,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
