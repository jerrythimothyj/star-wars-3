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
  login
} from '../../actions/user.actions'

class Home extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    // Where to put this condition
    if(this.props.name != '') {
      // this.props.changePage()
    }
    return (
      <div>
      <h1>Home</h1>
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
    </div>
    )
  }
}
// const Home = props => (
//   <div>
//     <h1>Home</h1>
//     <p>Count: {this.props.count}</p>

//     <p>
//       <button onClick={this.props.increment} disabled={this.props.isIncrementing}>Increment</button>
//       <button onClick={this.props.incrementAsync} disabled={this.props.isIncrementing}>Increment Async</button>
//     </p>

//     <p>
//       <button onClick={this.props.decrement} disabled={this.props.isDecrementing}>Decrementing</button>
//       <button onClick={this.props.decrementAsync} disabled={this.props.isDecrementing}>Decrement Async</button>
//     </p>

//     <p>
//       <button onClick={() => this.props.login('luke', '19bby')}>Login</button>
//     </p>

//     <p><button onClick={() => this.props.changePage()}>Go to about page via redux</button></p>
//   </div>
// )

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing,
  name: state.user.name,
  password: state.user.password,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  login,
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home) 