import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Shared from './Shared';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/shared/:title/:list" component={Shared}/>
      <Route component={App}/>
    </Switch>
  </BrowserRouter>
)

export default Routes;