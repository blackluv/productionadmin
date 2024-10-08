//import React from 'react';
import React, { useState } from 'react';
import './App.css';
//import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import { Routes, Route } from "react-router-dom"
//import Dashboard from '../Dashboard/Dashboard';
//import Preferences from '../Preferences/Preferences';
import Home from './Home';
import Settings from './Settings'
import Auth from './auth'
import Users from './User'
import useToken from './useToken';
import Invoice from './Invoice'
import Wallet from './Wallet'
import Transaction from './Transactions'
import Withdraw from './Withdraw'
import Refund from './Refund'


function App() {

  const { token, setToken } = useToken();
    //const [token, setToken] = useState();
    //const token = getToken(); 
    if(!token) {
      //console.log(token, 'token')
      return <Auth setToken={setToken} />
    }
  return (
    <div className="wrapper">
        <Routes>
            <Route path="/home" element={ <Home/> } />
            <Route path="/" element={ <Home/> } />
            <Route path="/settings" element={ <Settings />} />
            <Route path="/users" element={ <Users />} />
            <Route path="/deposit" element={ <Invoice />} />
            <Route path="/admin" element={ <Wallet />} />
            <Route path="/payout" element={ <Withdraw />} />
            <Route path="/refund" element={ <Refund />} />
            <Route path='/transaction/:id' element={<Transaction />} />
        </Routes>
    </div>
  );
}

export default App;