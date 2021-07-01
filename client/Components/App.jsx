import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Dashboard from './Dashboard';
import SignIn from '../signin/signin';
import SignUp from '../signup/signup';
import BioPage from './BioPage';

import MapContainerComponent from '../Components/MapComponents/MapContainerPage';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            {/* <MapContainerComponent /> */}
            <SignIn />
            {/* <Dashboard /> */}
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/dashboard/MapPage">
            <MapContainerComponent />
          </Route>

          <Route path="/dashboard/Biopage">
            <BioPage />
          </Route>

          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
