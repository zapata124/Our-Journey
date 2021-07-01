import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Dashboard from './Dashboard';
import Login from './Login';
import SignUp from './Signup';
import BioPage from './BioPage';
import MapPage from './MapPage';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/dashboard/Biopage">
            <BioPage />
          </Route>
          <Route path="/dashboard/MapPage">
            <MapPage />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
