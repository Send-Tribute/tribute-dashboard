import React, { useContext } from 'react';
import { ethers } from 'ethers';
import { Context } from '../../context';
import { TABS } from '../../helpers/constants';
import { Button, Typography } from '@material-ui/core';
import { CONTRACTS } from '../../helpers/constants';
import DAIabi from '../../../contracts/dai';
import rDAIabi from '../../../contracts/rDai';
import Tribute from '../../Tribute';
import { Icon } from '../../general';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  icon: {
    width: 30
  }
});

export default function EnableWeb3Button() {
  const [context, setContext] = useContext(Context);
  const classes = useStyles();

  const { userDetails } = context;
  let tributeBalance = 'loading...';
  if (userDetails) {
    tributeBalance = Math.trunc(userDetails.balance);
  }

  async function connectWallet() {
    // 1. enable metamask
    if (window.ethereum) {
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
          const userDetails = await tribute.getInfo();
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
      }
    }
  }

  return (
    <Button
      variant="text"
      onClick={connectWallet}
      style={{ color: 'white', borderColor: 'white' }}
    >
      <Typography variant="body2">{tributeBalance}</Typography>
      <Icon name="headerLogo" className={classes.icon} />
    </Button>
  );
}
