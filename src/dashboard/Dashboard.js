import React, { useEffect, useContext } from 'react';
import { Context } from './context';
import { ethers } from 'ethers';
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

  
  let user = {};

  window.ethereum.on('accountsChanged', function (accounts) {
    //should update context when user change is detected
    if (context.address && context.address !== accounts[0]) {
       setContext(state => {
        return Object.assign(
          {},
          state,
          { address: accounts[0] }
        );
      });
      console.log("Address was updated " + accounts[0]);
    }
  });

  useEffect(() => {
    
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
