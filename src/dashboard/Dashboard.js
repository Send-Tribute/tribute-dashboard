import React, { useState, useEffect, useContext } from 'react';
import { Context } from './context';
import { ethers } from 'ethers';
import DAIabi from '../contracts/dai'; // 0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99
import rDAIabi from '../contracts/rDai'; // 0xea718e4602125407fafcb721b7d760ad9652dfe7
import Tribute from './Tribute';

import Footer from './Footer.js';
import Header from './Header.js';
//import Table from './Table.js';
//import Sending from './sending/Sending.js';
//import Wallet from './wallet/Wallet.js';
//import Receiving from './receiving/Receiving.js';
//import Settings from './settings/Settings.js';
//import './css/outline.css';

export default function Dashboard() {

  const [context, setContext] = useContext(Context);

  useEffect(() => {
    try {
      if (typeof window.ethereum !== 'undefined'
        || (typeof window.web3 !== 'undefined')) {
        console.log(window.web3.version);
        // Web3 browser user detected. You can now use the provider.
        // let walletProvider = window['ethereum'] || window.web3.currentProvider;
        let walletProvider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        
        //const contactAddress = ""; //READ FROM FILE
        const rDAIAddress = '0xea718e4602125407fafcb721b7d760ad9652dfe7';
        const DAIAddress = '0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99';
        
        // connect to contracts on the network
        const rDAIContract = new ethers.Contract(rDAIAddress, rDAIabi, walletProvider);
        const DAIContract = new ethers.Contract(DAIAddress, DAIabi, walletProvider);
        
        const tribute = new Tribute(DAIContract, rDAIContract, walletProvider);

        console.log(tribute.provider);
        console.log(tribute.contract);
        console.log(tribute.signer);
        // const isConnected = true;
        // setContext(state => {
        //     return Object.assign({}, {tribute}, {isConnected})
        // });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  //let [selectedTab, setSelectedTab] = useState();

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
  //
  //
  //    <Header/>
  //    { /* controller call would go here */ }
  //    <Footer/>

  return (
    <div>
      DASHBOARD
    </div>
  );
}
