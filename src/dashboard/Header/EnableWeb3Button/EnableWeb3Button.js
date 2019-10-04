import React, { useContext } from 'react';
import { ethers } from 'ethers';
import { Context } from '../../context';
import { TABS } from '../../helpers/constants';
import { Button } from '@material-ui/core';
import { CONTRACTS } from '../../helpers/constants';
import DAIabi from '../../../contracts/dai'; 
import rDAIabi from '../../../contracts/rDai';
import Tribute from '../../Tribute';

let isConnected = false;

export default function EnableWeb3Button() {
  const [context, setContext] = useContext(Context);

  async function connectWallet() {
    // 1. enable metamask
    let address = await window.ethereum.enable();
    console.log(`address ${address}`);

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
          let walletProvider = new ethers.providers.Web3Provider(window.web3.currentProvider);

          // connect to contracts on the network
          const rDAIContract = new ethers.Contract(CONTRACTS.rtoken.kovan, rDAIabi, walletProvider);
          const DAIContract = new ethers.Contract(CONTRACTS.dai.kovan, DAIabi, walletProvider);
          const tribute = new Tribute(DAIContract, rDAIContract, walletProvider, address);

          setContext(state => {
            return Object.assign(
              {},
              state,
              { tribute },
              { isConnected: false },
              { provider: walletProvider }
            );
          });
          
        }
      } catch (error) {
            console.log('Web3 Loading Error: ', error.message);
      }
  }

  return (
    <Button variant="contained" color="secondary" onClick={ connectWallet }>
      Enable Wallet
    </Button>
  );
}
