import React, { useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { Context } from './context';
import Footer from './Footer';
import Header from './Header/Header';
import Sending from './Sending/Sending';
import Wallet from './Wallet/Wallet';
import Receiving from './Receiving/Receiving';
import Settings from './Settings/Settings';

import DAIabi from '../contracts/dai';
import rDAIabi from '../contracts/rDai';
import Tribute from './Tribute';

import { TABS, CONTRACTS } from './helpers/constants';

export default function Dashboard() {
  const [context, setContext] = useContext(Context);

  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', accounts => {
      // should update context when user change is detected
      if (context.address && context.address !== accounts[0]) {
        setContext(state => ({ ...state, address: accounts[0] }));
        console.log(`Address was updated ${accounts[0]}`);
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
          setContext(state => ({
            ...state,
            error: `Web3 Loading Error 1: ${error}`
          }));
        }

        setContext(state => ({
          ...state,
          isConnected: true,
          address
        }));

        try {
          if (
            typeof window.ethereum !== 'undefined' ||
            typeof window.web3 !== 'undefined'
          ) {
            const walletProvider = new ethers.providers.Web3Provider(
              window.web3.currentProvider
            );

            // connect to contracts on the network
            const rDAIContract = new ethers.Contract(
              CONTRACTS.rtoken.kovan,
              rDAIabi,
              walletProvider.getSigner()
            );
            const DAIContract = new ethers.Contract(
              CONTRACTS.dai.kovan,
              DAIabi,
              walletProvider.getSigner()
            );
            const tribute = new Tribute(DAIContract, rDAIContract, address[0]);
            const userDetails = await tribute.getInfo();
            console.log(userDetails);
            setContext(state => ({
              ...state,
              tribute,
              userDetails,
              isConnected: false,
              provider: walletProvider
            }));
          }
        } catch (error) {
          console.log('Web3 Loading Error: ', error.message);
          setContext(state => ({
            ...state,
            error: `Web3 Loading Error 2: ${error}`
          }));
        }
      } else {
        setContext(() => ({
          error: 'Web3 Loading Error: no window.ethereum'
        }));
      }
    }
    load();
  }, []);

  function getContent() {
    // let [selectedTab, setSelectedTab] = useState();
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
