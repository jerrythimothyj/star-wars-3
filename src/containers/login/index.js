import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  login, 
  logout
} from '../../actions'

import './index.css';

class Login extends Component {
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
        logoutFailed: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
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

componentWillReceiveProps(nextProps) {
  this.setState({
    loginSucceeded: nextProps.loginSucceeded,
    loginFailed: nextProps.loginFailed,
    logoutSucceeded: nextProps.logoutSucceeded,
    logoutFailed: nextProps.logoutFailed
  });
}

  render() {
    const { username, password, submitted, loginSucceeded, loginFailed } = this.state;
    return (
      <div className="login">
      <h1>Login</h1>
      <form name="form" onSubmit={this.handleSubmit}>
        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
            {submitted && !username &&
                <div className="help-block">Username is required</div>
            }
        </div>
        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
            {submitted && !password &&
                <div className="help-block">Password is required</div>
            }
        </div>
        {submitted && loginFailed && !loginSucceeded && 
          <div className="help-block">Invalid Credentials</div>
        }
        <div className="form-group">
            <button className="btn btn-primary">Login</button>
        </div>
    </form>
    
    </div>
    )
  }
}


const mapStateToProps = state => {
  return ({
    username: state.user.username,
    password: state.user.password,
    submitted: state.user.submitted,
    loginSucceeded: state.user.loginSucceeded,
    loginFailed: state.user.loginFailed,
    logoutSucceeded: state.user.logoutSucceeded,
    logoutFailed: state.user.logoutFailed
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  logout
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login) 