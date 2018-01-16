import React from 'react';
import { Route } from 'react-router-dom'
import Login from '../login'
import Planets from '../planets'
import Header from '../../components/header'

const App = () => (
  <div>
    <Header></Header>

    <main id="main">
      <Route exact path="/" component={Login} />
      <Route exact path="/planets" component={Planets} />
    </main>
  </div>
)

export default App;