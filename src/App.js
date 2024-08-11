import React from 'react';
import Login from './components/Login.js'
import Dashboard from './components/Dashboard';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { GlobalProvider } from './context/GlobalState';
import {UserProvider} from './context/UserContext'

import './css/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element ={<UserProvider><Login/></UserProvider>}/>
        <Route path="/dashboard" element ={<UserProvider><Dashboard/></UserProvider>}/>
      </Routes>
    </Router>
  );
}

export default App;
