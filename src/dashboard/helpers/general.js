export const TABS = {
  ordering: ['wallet', 'sending', 'receiving', 'settings'],
  default: 'wallet',
  displayNames: {
    wallet: 'Wallet',
    sending: 'Sending',
    receiving: 'Receiving',
    settings: 'Settings'
  },
  icons: {
    wallet: 'accountBalanceWallet',
    sending: 'send',
    receiving: 'callReceived',
    settings: 'settings'
  }
};

export const CONTRACTS = {
  rtoken: {
    kovan: '0xea718e4602125407fafcb721b7d760ad9652dfe7'
  },
  allocationStrategy: {
    kovan: '0xb4377efc05bd28be8e6510629538e54eba2d74e3'
  },
  cdai: {
    kovan: '0x0a1e4d0b5c71b955c0a5993023fc48ba6e380496'
  },
  dai: {
    kovan: '0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99'
  }
};

export const DISCOVERABLE_PROVIDERS = {
  oneClickDapp: {
    name: 'One Click Dapp',
    address: '0xb4377efc05bd28be8e6510629538e54eba2d74e3',
    website: 'http://oneclickdapp.com',
    description: 'Generate frontends quickly for your smart contracts',
    tags: ['open-source', 'tools', 'web3'],
    image: 'oneClickDapp'
  },
  superMarianoBrothers: {
    name: 'Super Mariano Bros.',
    description:
      'Pick up coins as you make your way through Governance castle.',
    address: '0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99',
    website: './',
    tags: ['game', 'paid', 'entertainment'],
    image: 'superMariano'
  }
};

export const NETWORKS = {
  kovan: {
    etherscan: 'https://kovan.etherscan.io/address/'
  }
};

export const FIAT_GATEWAYS = {
  coinbase: {
    name: 'Coinbase',
    website: '',
    image: 'coinbase'
  },
  kyber: {
    name: 'Kyber Network',
    website: '',
    image: 'kyber'
  },
  wyre: {
    name: 'Wyre',
    website: '',
    image: 'wyre'
  }
};

export const CRYPTO_EXCHANGES = {};