import React from 'react';

import tribute_logo_dark from '../assets/tribute-logo-dark.png';
import faucet_on from '../assets/faucet-on.png';
import faucet_off from '../assets/faucet-off.png';
import dai from '../assets/dai.png';
import receive_money from '../assets/receive-money.png';
import {
  Cached,
  AccountBalanceWallet,
  Send,
  CallReceived,
  Settings
} from '@material-ui/icons';

export const ICONS = {
  faucetOn: {
    type: 'image',
    src: faucet_on
  },
  faucetOff: {
    type: 'image',
    src: faucet_off
  },
  receiveMoney: {
    type: 'image',
    src: receive_money
  },
  cached: {
    type: 'muiIcon',
    component: <Cached />
  },
  accountBalanceWallet: {
    type: 'muiIcon',
    component: <AccountBalanceWallet />
  },
  send: {
    type: 'muiIcon',
    component: <Send />
  },
  callReceived: {
    type: 'muiIcon',
    component: <CallReceived />
  },
  settings: {
    type: 'muiIcon',
    component: <Settings />
  },
  logo: {
    type: 'image',
    src: tribute_logo_dark
  },
  baseCurrency: {
    type: 'image',
    src: dai
  }
};
