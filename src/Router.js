import React from 'react';

import {
  Route,
  Switch,
  BrowserRouter,
  Redirect
} from 'react-router-dom';

import Teams from './pages/Teams'
import Team from './pages/Team'


const Router = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/teams" />
        </Route>
        <Route exact default path="/teams"
          component={Teams}
        />
        <Route path="/teams/:id"
          component={Team}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Router

