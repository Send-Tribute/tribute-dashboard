import React from 'react';

import tribute_logo_dark from '../assets/tribute-logo-dark.png';
import faucet_on from '../assets/faucet-on.png';
import faucet_off from '../assets/faucet-off.png';
import dai from '../assets/dai.png';
import super_mariano from '../assets/super-mariano.jpeg';
import one_click_dapp from '../assets/one-click-dapp.png';
import receive_money from '../assets/receive-money.png';
import ice_cubes from '../assets/ice-cubes.png';
import waterwheel from '../assets/waterwheel.png';
import waterwheel_off from '../assets/waterwheel-off.png';
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
  waterwheel: {
    type: 'image',
    src: waterwheel
  },
  waterwheelOff: {
    type: 'image',
    src: waterwheel_off
  },
  iceCubes: {
    type: 'image',
    src: ice_cubes
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
  },
  superMariano: {
    type: 'image',
    src: super_mariano
  },
  oneClickDapp: {
    type: 'image',
    src: one_click_dapp
  }
};
