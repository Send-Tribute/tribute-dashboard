import React, { useState, useContext } from 'react';
import { ethers } from 'ethers';
import Tribute from './Tribute';

import Footer from './Footer.js';
import Header from './Header.js';
import Table from './Table.js';
import Sending from './sending/Sending.js';
import Wallet from './wallet/Wallet.js';
import Receiving from './receiving/Receiving.js';
import Settings from './settings/Settings.js';
import './css/outline.css';

export default function Dashbaord() {

  const [context, setContext] = useContext();

  useEffect(() => {
    try {
      if (typeof window.ethereum !== 'undefined'
        || (typeof window.web3 !== 'undefined')) {
        console.log(window.web3.version);
        // Web3 browser user detected. You can now use the provider.
        const walletProvider = window['ethereum'] || window.web3.currentProvider;
        walletProvider = new ethers.providers.Web3Provider(walletProvider);
        const contactAddress = ""; //READ FROM FILE
        const rDAIContract = new ethers.ContractFactory(contractAddress, abi, walletProvider);
        const tribute = new Tribute(rDAIContract, walletProvider);
        const isConnected = true;
        setContext(state => ({ ...context, tribute, isConnected }));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  let [selectedTab, setSelectedTab] = useState();

  //use state, context or redux. We plan on using state since it's not necessary to use context

  //function here that renders Wallet, Sending, Receiving, and Settings based on state
  //pass the setSelectedTab Header
  //
  //the problem is that all the data between the views is different. How do we obtain that data and pass it
  //in a generalized way?
  //
  //Proposals:
  //We can use controllers that will fetch and then we can passed the returned data
  //based upon state call the correct controller to get the correct data
  //there will be 4 different controllers

  return (
    <div>
      DASHBOARD
      <Header/>
      { /* controller call would go here */ }
      <Footer/>
    </div>
  );
}
