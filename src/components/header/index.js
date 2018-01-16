import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {
  logout
} from '../../actions'
import { getSessionStorageItem } from '../../services/storage/storage.services';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginSucceeded: false,
      loginFailed: false,
      logoutSucceeded: false,
      logoutFailed: false
    };

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loginSucceeded: nextProps.loginSucceeded,
      loginFailed: nextProps.loginFailed,
      logoutSucceeded: nextProps.logoutSucceeded,
      logoutFailed: nextProps.logoutFailed
    });
  }
  
  render() {
    this.isUserLoggedIn = getSessionStorageItem('loggedInUser')

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">Star Wars</a>
        <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              {this.isUserLoggedIn && 
                <a className="nav-link" href="#" onClick={() => this.props.logout()}>Logout</a>
              }
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return ({
    loginSucceeded: state.user.loginSucceeded,
    loginFailed: state.user.loginFailed,
    logoutSucceeded: state.user.logoutSucceeded,
    logoutFailed: state.user.logoutFailed,
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  logout
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)