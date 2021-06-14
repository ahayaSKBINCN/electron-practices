import React from 'react';
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import AdminLayout from './layouts/Admin';

export default function App(){
  return <HashRouter>
    <Switch>
      <Route path="/admin" component={AdminLayout} />
      <Redirect from="/" to="/admin"/>
    </Switch>
  </HashRouter>
}
