import React from 'react';
import { useTransition, useTransitionHistory } from 'react-route-transition';
import Home from './Components/Home';
import Login from './Components/Login';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends React.Component {


  render(){
  return (
    <Router>
      <Switch>
    <Route exact path="/">
    <Login/>
  </Route>

  <Route exact path="/home">
    <Home/>
  </Route>
</Switch>
</Router>

  );
}
}
