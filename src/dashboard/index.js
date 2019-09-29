import React from 'react';
import ReactDOM from "react-dom";
import { ethers } from 'ethers';
import { Provider } from './context';
import Dashboard from "./Dashboard.js";

//Set Injection Bindings Here:

//create the contract here using ethers

//Views
//Controllers
//Tribute.js
const context = { }

let App = document.getElementById('app');
ReactDOM.render(
  <Provider>
    <Dashboard/>
  </Provider>,
  App
);
