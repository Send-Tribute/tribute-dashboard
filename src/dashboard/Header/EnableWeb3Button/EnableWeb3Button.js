import React, { useContext } from 'react';
import { Context } from '../../context';
import { TABS } from '../../helpers/constants';
import { Button } from '@material-ui/core';

export default function EnableWeb3Button() {
  const [context, setContext] = useContext(Context);

  async function connectWallet() {
    let address = await window.ethereum.enable();
    setContext(state => {
      return Object.assign(
        {},
        state,
        { isConnected: true },
        { address: address[0] }
      );
    });
    console.log("Wallet was Connected");
  }

  return (
    <Button variant="contained" color="secondary" onClick={ connectWallet }>
      Enable Wallet
    </Button>
  );
}
