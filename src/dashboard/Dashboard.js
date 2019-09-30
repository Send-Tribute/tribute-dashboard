import React, { useEffect, useContext } from 'react';
import { Context } from './context';
import { ethers } from 'ethers';
import Tribute from './Tribute';

import Footer from './Footer.js';
import Header from './Header.js';
import Sending from './sending/Sending.js';
import Wallet from './wallet/Wallet.js';
import Receiving from './receiving/Receiving.js';
import Settings from './settings/Settings.js';
//import Table from './Table.js';
//import './css/outline.css';

import { TABS } from './helpers/general';

const Dashboard = () => {
  const [context, setContext] = useContext(Context);

  useEffect(() => {
    try {
      if (
        typeof window.ethereum !== 'undefined' ||
        typeof window.web3 !== 'undefined'
      ) {
        console.log(window.web3.version);
        // Web3 browser user detected. You can now use the provider.
        let walletProvider = window['ethereum'] || window.web3.currentProvider;
        walletProvider = new ethers.providers.Web3Provider(walletProvider);
        let tribute = null;
        //const contactAddress = ""; //READ FROM FILE
        //const rDAIContract = new ethers.ContractFactory(contractAddress, abi, walletProvider);
        //const tribute = new Tribute(rDAIContract, walletProvider);
        const isConnected = true;
        setContext(state => {
          return Object.assign({}, { tribute }, { isConnected });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getContent = () => {
    const tabName = context.selectedTab ? context.selectedTab : TABS.default;
    if (tabName === 'sending') return <Sending />;
    if (tabName === 'receiving') return <Receiving />;
    if (tabName === 'settings') return <Settings />;
    return <Wallet />;
  };

  return (
    <div>
      <Header />
      {getContent()}
      <Footer />
    </div>
  );
};

export default Dashboard;
