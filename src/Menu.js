import React, { Component } from 'react';
import firebase from 'firebase';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Bisection from './pages/Bisection';
import CompositeSimpson from './pages/CompositeSimpson';
import FWOH2 from './pages/FWOH2';
import Lagrange from './pages/Lagrange';
import BWOH2 from './pages/BackwardH2'
import './App.css';


export default class Menu extends Component{
 render() {
  return (
     <div className="body">
         <BrowserRouter><br/>
         <Link to="/Bisection"><i className="fa fa-circle-o" />Bisection</Link>
          {" | "}
         <Link to="/Lagrange"><i className="fa fa-circle-o" />Lagrange</Link>
          {" | "}
         <Link to="/CompositeSimpson"><i className="fa fa-circle-o" />CompositeSimpson</Link>
          {" | "}
         <Link to="/FWOH2"><i className="fa fa-circle-o" />FWOH2</Link>
          {" | "}
         <Link to="/BWOH2"><i className="fa fa-circle-o" />BWOH2</Link>
    
          <Switch>
          <Route exact path="/Bisection" component={Bisection} />
          <Route exact path="/Lagrange" component={Lagrange} />
          <Route exact path="/CompositeSimpson" component={CompositeSimpson} />
          <Route exact path="/FWOH2" component={FWOH2} />
          <Route exact path="/BWOH2" component={BWOH2} />
        </Switch>
      </BrowserRouter>
    
    
    </div>
  );
 }
}