import React, { useState, useEffect, useContext } from 'react';
import { Context } from './context';
import { ethers } from 'ethers';
import Tribute from './Tribute';

import Footer from './Footer.js';
import Header from './Header.js';
import HeaderController from './HeaderController.js';
//import Table from './Table.js';
//import Sending from './sending/Sending.js';
//import Wallet from './wallet/Wallet.js';
//import Receiving from './receiving/Receiving.js';
//import Settings from './settings/Settings.js';
//import './css/outline.css';

export default function Dashboard() {

  const [context, setContext] = useContext(Context);

  function getViews() {
    return Object.assign({},
      { Header },
    )
  }

  function getControllers(tribute) {
    return Object.assign({},
      { HeaderController: new HeaderController(tribute) },
    )
  }

  useEffect(() => {
    let views = getViews();
    let controllers = null;
    let tribute = null;
    let isConnected = false;

    try {
      if (typeof window.ethereum !== 'undefined'
        || (typeof window.web3 !== 'undefined')) {
        console.log(window.web3.version);
        // Web3 browser user detected. You can now use the provider.
        let walletProvider = window['ethereum'] || window.web3.currentProvider;
        walletProvider = new ethers.providers.Web3Provider(walletProvider);
        //const contactAddress = ""; //READ FROM FILE
        //const rDAIContract = new ethers.ContractFactory(contractAddress, abi, walletProvider);
        tribute = new Tribute("", walletProvider);
        isConnected = true;

        controllers = getControllers(tribute); 
      }

      setContext(state => {
        return Object.assign(
          { views },
          { controllers },
          { tribute },
          { isConnected },
        )
      });
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <div>
      DASHBOARD
      <Header/>
      { /* controller call would go here */ }
      <Footer/>
    </div>
  );
}
