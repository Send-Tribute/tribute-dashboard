import React, { useEffect, useContext } from 'react';
import { Context } from './context';
import { ethers } from 'ethers';
import DAIabi from '../contracts/dai'; // 0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99
import rDAIabi from '../contracts/rDai'; // 0xea718e4602125407fafcb721b7d760ad9652dfe7
import Tribute from './Tribute';

import Footer from './Footer.js';
import Header from './Header/Header.js';
import Sending from './Sending/Sending.js';
import Wallet from './Wallet/Wallet.js';
import Receiving from './Receiving/Receiving.js';
import Settings from './Settings/Settings.js';
import rToken from '../contracts/rDai.json';

import { TABS, CONTRACTS } from './helpers/constants';

export default function Dashboard() {
  const [context, setContext] = useContext(Context);
  const rDAIAddress = '0xea718e4602125407fafcb721b7d760ad9652dfe7';
  const DAIAddress = '0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99';

  useEffect(() => {
    try {
      if (
        typeof window.ethereum !== 'undefined' ||
        typeof window.web3 !== 'undefined'
      ) {
        console.log(window.web3.version);
        // Web3 browser user detected. You can now use the provider.
        // let walletProvider = window['ethereum'] || window.web3.currentProvider;
        let walletProvider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        
        // connect to contracts on the network
        const rDAIContract = new ethers.Contract(rDAIAddress, rDAIabi, walletProvider);
        const DAIContract = new ethers.Contract(DAIAddress, DAIabi, walletProvider);
        const tribute = new Tribute(DAIContract, rDAIContract, walletProvider);

        const isConnected = true;
        setContext(state => {
          return Object.assign(
            {},
            { tribute },
            { isConnected }
            //{ userDetails }
          );
        });
      }
    } catch (error) {
          console.log('Web3 Loading Error: ', error.message);
    }
  }, []);

  function getContent() {
    //let [selectedTab, setSelectedTab] = useState();
    const tabName = context.selectedTab ? context.selectedTab : TABS.default;
    if (tabName === 'sending') return <Sending />;
    if (tabName === 'receiving') return <Receiving />;
    if (tabName === 'settings') return <Settings />;
    return <Wallet />;
  }

  return (
    <div>
      <Header />
      {getContent()}
      <Footer />
    </div>
  );
};
