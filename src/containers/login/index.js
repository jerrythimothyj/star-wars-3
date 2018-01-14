import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter'

import {
  login, 
  logout
} from '../../actions/user.actions'

class Login extends Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.logout();

    this.state = {
        username: '',
        password: '',
        submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleChange(e) {
    console.log(e.target);
    const { name, value } = e.target;
    this.setState({ [name]: value });
}

handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
        this.props.login(username, password);
    }
}

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    // Where to put this condition
    if(this.props.name != '') {
      // this.props.changePage()
    }
    return (
      <div>
      <h1>Login</h1>
      <p>Count: {this.props.count}</p>
  
      <p>
        <button onClick={this.props.increment} disabled={this.props.isIncrementing}>Increment</button>
        <button onClick={this.props.incrementAsync} disabled={this.props.isIncrementing}>Increment Async</button>
      </p>
  
      <p>
        <button onClick={this.props.decrement} disabled={this.props.isDecrementing}>Decrementing</button>
        <button onClick={this.props.decrementAsync} disabled={this.props.isDecrementing}>Decrement Async</button>
      </p>
  
      <p>
        <button onClick={() => this.props.login('luke', '19bby')}>Login</button>
      </p>
  
      <p><button onClick={() => this.props.changePage()}>Go to about page via redux</button></p>

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
            <input type="text" className="form-control" name="password" value={password} onChange={this.handleChange} />
            {submitted && !password &&
                <div className="help-block">Password is required</div>
            }
        </div>
        <div className="form-group">
            <button className="btn btn-primary">Login</button>
            {loggingIn &&
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            }
        </div>
    </form>
    
    </div>
    )
  }
}


const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing,
  username: state.user.username,
  password: state.user.password,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  login,
  logout,
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login) 