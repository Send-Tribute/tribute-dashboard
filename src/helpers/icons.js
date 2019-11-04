import React from 'react';

import {
  Cached,
  AccountBalanceWallet,
  Send,
  CallReceived,
  Settings
} from '@material-ui/icons';
import tribute_logo_dark from '../assets/tribute-logo-dark.png';
import faucet_on from '../assets/faucet-on.png';
import faucet_off from '../assets/faucet-off.png';
import super_mariano from '../assets/super-mariano.jpeg';
import defiant from '../assets/defiant.png';
import one_click_dapp from '../assets/one-click-dapp.png';
import receive_money from '../assets/receive-money.png';
import ice_cubes from '../assets/ice-cubes.png';
import waterwheel from '../assets/waterwheel.png';
import waterwheel_off from '../assets/waterwheel-off.png';
import tribute_logo_white from '../assets/white-logo.png';
import convert_dai_tribute from '../assets/convert-dai-tribute.png';
import convert_dollar_tribute from '../assets/convert-dollar-tribute.png';
import wallet from '../assets/wallet.png';
import wallet_white from '../assets/wallet-white.png';
import kyber from '../assets/kyber.png';
import coinbase from '../assets/coinbase.png';
import wyre from '../assets/wyre.png';
import qr from '../assets/qr.png';
import unicef from '../assets/unicef.jpeg';

const ICONS = {
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
    src: tribute_logo_dark
  },
  headerLogo: {
    type: 'image',
    src: tribute_logo_white
  },
  superMariano: {
    type: 'image',
    src: super_mariano
  },
  defiant: {
    type: 'image',
    src: defiant
  },
  oneClickDapp: {
    type: 'image',
    src: one_click_dapp
  },

  convertDollarTribute: {
    type: 'image',
    src: convert_dollar_tribute
  },
  convertDaiTribute: {
    type: 'image',
    src: convert_dai_tribute
  },
  tributeToken: {
    type: 'image',
    src: tribute_logo_dark
  },
  wallet: {
    type: 'image',
    src: wallet
  },
  walletWhite: {
    type: 'image',
    src: wallet_white
  },
  kyber: {
    type: 'image',
    src: kyber
  },
  coinbase: {
    type: 'image',
    src: coinbase
  },
  wyre: {
    type: 'image',
    src: wyre
  },
  qr: {
    type: 'image',
    src: qr
  },
  unicef: {
    type: 'image',
    src: unicef
  }
};

export default ICONS;
