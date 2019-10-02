import React, { useEffect, useContext } from 'react';
import { Context } from './context';
import { ethers } from 'ethers';
import Tribute from './Tribute';

import Footer from './Footer.js';
import Header from './Header/Header.js';
import Sending from './Sending/Sending.js';
import Wallet from './Wallet/Wallet.js';
import Receiving from './Receiving/Receiving.js';
import Settings from './Settings/Settings.js';
import rToken from '../contracts/rDai.json';

import { TABS, CONTRACTS } from './helpers/constants';

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
        const contractAddress = CONTRACTS.rtoken.kovan;
        // const rDAIContract = new ethers.ContractFactory(
        //   contractAddress,
        //   rToken.abi,
        //   walletProvider
        // );
        // tribute = new Tribute(rDAIContract, walletProvider);
        const userAddress = '0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99'; // TODO: replace dummy address
        const userDetails = {
          address: userAddress
        };
        const isConnected = true;
        setContext(state => {
          return Object.assign(
            {},
            { tribute },
            { isConnected },
            { userDetails }
          );
        });
      }
    } catch (error) {
      console.log('Web3 Loading Error: ', error.message);
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
