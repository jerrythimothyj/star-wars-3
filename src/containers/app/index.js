import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../login';
import Planets from '../planets';
import Peoples from '../peoples';
import Species from '../species';
import { Header } from '../../components';

const App = () => (
  <div>
    <Header />

    <main id="main">
      <Route exact path="/" component={Login} />
      <Route exact path="/planets" component={Planets} />
      <Route exact path="/peoples" component={Peoples} />
      <Route exact path="/species" component={Species} />
    </main>
  </div>
);

export default App;
