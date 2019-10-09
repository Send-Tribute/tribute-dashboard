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

import DAIabi from '../contracts/dai';
import rDAIabi from '../contracts/rDai';
import Tribute from './Tribute';

import { TABS, CONTRACTS } from './helpers/constants';

export default function Dashboard() {
  const [context, setContext] = useContext(Context);

  let user = {};

  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', function(accounts) {
      //should update context when user change is detected
      if (context.address && context.address !== accounts[0]) {
        setContext(state => {
          return Object.assign({}, state, { address: accounts[0] });
        });
        console.log('Address was updated ' + accounts[0]);
      }
    });
  }
  useEffect(() => {
    async function load() {
      // 1. enable metamask
      if (typeof window.ethereum !== 'undefined') {
        let address = '';
        try {
          address = await window.ethereum.enable();
          console.log(`address ${address}`);
        } catch (error) {
          setContext(state => {
            return Object.assign({}, state, {
              error: `Web3 Loading Error: ${error.message}`
            });
          });
        }

        setContext(state => {
          return Object.assign(
            {},
            state,
            { isConnected: true },
            { address: address }
          );
        });

        try {
          if (
            typeof window.ethereum !== 'undefined' ||
            typeof window.web3 !== 'undefined'
          ) {
            let walletProvider = new ethers.providers.Web3Provider(
              window.web3.currentProvider
            );

            // connect to contracts on the network
            const rDAIContract = new ethers.Contract(
              CONTRACTS.rtoken.kovan,
              rDAIabi,
              walletProvider
            );
            const DAIContract = new ethers.Contract(
              CONTRACTS.dai.kovan,
              DAIabi,
              walletProvider
            );
            const tribute = new Tribute(
              DAIContract,
              rDAIContract,
              walletProvider,
              address
            );
            const userDetails = await tribute.getTributes();
            console.log(userDetails);
            setContext(state => {
              return Object.assign(
                {},
                state,
                { tribute },
                { userDetails },
                { isConnected: false },
                { provider: walletProvider }
              );
            });
          }
        } catch (error) {
          console.log('Web3 Loading Error: ', error.message);
          setContext(state => {
            return Object.assign({}, state, {
              error: `Web3 Loading Error: ${error.message}`
            });
          });
        }
      } else {
        setContext(state => {
          return Object.assign(
            {},
            { error: 'Web3 Loading Error: no window.ethereum' }
          );
        });
      }
    }
    load();
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
}
