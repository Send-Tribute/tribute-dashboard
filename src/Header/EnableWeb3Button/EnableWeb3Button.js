import React, { useContext } from 'react';
import { ethers } from 'ethers';
import { Button, Typography } from '@material-ui/core';
import { createUseStyles } from 'react-jss';
import Tribute from 'tribute-utils';
import { Context } from '../../context';
import { CONTRACTS } from '../../helpers/constants';

import DAIabi from '../../contracts/dai';
import rDAIabi from '../../contracts/rDai';
import { Icon } from '../../general';

const useStyles = createUseStyles({
  icon: {
    width: 30,
    marginLeft: 10
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
      const address = await window.ethereum.enable();
      // eslint-disable-next-line no-console
      console.log(`address ${address}`);

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
          const externalUserDetails = await tribute.getInfo();
          // eslint-disable-next-line no-console
          console.log(externalUserDetails);
          setContext(state => ({
            ...state,
            tribute,
            userDetails: externalUserDetails,
            isConnected: false,
            provider: walletProvider
          }));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
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
