import React, { useContext } from 'react';
import {ethers} from 'ethers';
import { Context } from '../../context';
import { TABS } from '../../helpers/constants';
import { Button } from '@material-ui/core';
import DAIabi from '../../../contracts/dai'; // 0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99
import rDAIabi from '../../../contracts/rDai'; // 0xea718e4602125407fafcb721b7d760ad9652dfe7
import Tribute from '../../Tribute';

const rDAIAddress = '0xea718e4602125407fafcb721b7d760ad9652dfe7';
const DAIAddress = '0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99';
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
          console.log(window.web3.version);
          // Web3 browser user detected. You can now use the provider.
          // let walletProvider = window['ethereum'] || window.web3.currentProvider;
          let walletProvider = new ethers.providers.Web3Provider(window.web3.currentProvider);

          // connect to contracts on the network
          const rDAIContract = new ethers.Contract(rDAIAddress, rDAIabi, walletProvider);
          const DAIContract = new ethers.Contract(DAIAddress, DAIabi, walletProvider);
          const tribute = new Tribute(DAIContract, rDAIContract, walletProvider, address);
          const userDetails = await tribute.getTributes()
          console.log(userDetails) ;
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
      }
  }

  return (
    <Button variant="contained" color="secondary" onClick={ connectWallet }>
      Enable Wallet
    </Button>
  );
}
