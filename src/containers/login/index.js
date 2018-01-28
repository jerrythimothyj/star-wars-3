/* eslint-disable */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { login, logout } from '../../actions';

import './index.css';

export class Login extends Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.logout();

    this.state = {
      username: '',
      password: '',
      submitted: false,
      loginSucceeded: false,
      loginFailed: false,
      logoutSucceeded: false,
      logoutFailed: false,
      loaded: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loginSucceeded: nextProps.loginSucceeded,
      loginFailed: nextProps.loginFailed,
      logoutSucceeded: nextProps.logoutSucceeded,
      logoutFailed: nextProps.logoutFailed,
      loaded: nextProps.loaded,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  }

  render() {
    const {
      username, password, submitted, loginSucceeded, loginFailed, loaded,
    } = this.state;
    return (
      <div>
        <Loader color="#FFF" loaded={loaded}>
          <div className="login">
            <h1>Login</h1>
            <form name="form" onSubmit={this.handleSubmit}>
              <div className={`form-group${submitted && !username ? ' has-error' : ''}`}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="username"
                  value={username}
                  onChange={this.handleChange}
                />
                {submitted && !username &&
                  <div className="text-danger">Username is required</div>
                  }
              </div>
              <div className={`form-group${submitted && !password ? ' has-error' : ''}`}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  value={password}
                  onChange={this.handleChange}
                />
                {submitted && !password &&
                  <div className="text-danger">Password is required</div>
                  }
              </div>
              {submitted && loginFailed && !loginSucceeded &&
                <div className="text-danger">Invalid Credentials</div>
              }
              <div className="form-group">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </Loader>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  username: state.user.username,
  password: state.user.password,
  submitted: state.user.submitted,
  loginSucceeded: state.user.loginSucceeded,
  loginFailed: state.user.loginFailed,
  logoutSucceeded: state.user.logoutSucceeded,
  logoutFailed: state.user.logoutFailed,
  loaded: state.user.loaded,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  logout,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
