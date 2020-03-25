import React, { Component } from 'react';
import Header from '../src/components/Header';
import MessageList from './components/MessageList';
import MessageBox from './components/MessageBox';
import firebase from 'firebase';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Menu from './Menu';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    var config = {
    apiKey: "AIzaSyADICPr2P9LLFGZbq-TbmfBPsI58WnXJPw",
    authDomain: "numer-0183.firebaseapp.com",
    databaseURL: "https://numer-0183.firebaseio.com",
    projectId: "numer-0183",
    storageBucket: "numer-0183.appspot.com",
    messagingSenderId: "317037495024",
  };
  firebase.initializeApp(config);
}
  render() {
  return (
    <div className ="h1">
    NUMERIAL METHOD<br/>
    NICHAKORN DONTREECHAREON<br/>
    6004062630183<br/>
    <Menu/>
    </div>
  );
 }
}
export default App;