import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import axios from 'axios'
const api = axios.create({
    baseURL: 'http://192.168.99.100:8080/api',
})


ReactDOM.render(<App />, document.getElementById('root'));


