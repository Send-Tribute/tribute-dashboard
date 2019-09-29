import React from 'react';
import ReactDOM from "react-dom";
import { ethers } from 'ethers';
import { Context, Provider } from './context';
import { Tribute } from './Tribute';
import Dashboard from "./Dashboard";

//Set Injection Bindings Here:
//Views
//Controllers
const context = {
  tribute: tribute
}

useEffect(() => {
  //create the contract here using ethers
  const walletProvider = new ethers.providers.Web3Provider(web3.currentProvider);
  const contactAddress = "";
  const rDAIContract = new ethers.ContractFactory(contractAddress, abi, walletProvider)
  const tribute = new Tribute(rDAIContract, walletProvider);
}, []);



let App = document.getElementById('app');
ReactDOM.render(
  <Provider>
    <Dashboard/>
  </Provider>,
  App
);
