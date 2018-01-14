import React from 'react';
import { Route, Link } from 'react-router-dom'
import Login from '../login'
import Planets from '../planets'

const App = () => (
  <div>
    <header>
      <Link to="/">Login</Link>
      <Link to="/planets">Planets</Link>
    </header>

    <main>
      <Route exact path="/" component={Login} />
      <Route exact path="/planets" component={Planets} />
    </main>
  </div>
)

export default App;