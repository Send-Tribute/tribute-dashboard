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
    kovan: '0xea718e4602125407fafcb721b7d760ad9652dfe7',
    homestead: '0xea8b224eDD3e342DEb514C4176c2E72Bcce6fFF9'
  },
  allocationStrategy: {
    kovan: '0xb4377efc05bd28be8e6510629538e54eba2d74e3'
  },
  cdai: {
    kovan: '0x0a1e4d0b5c71b955c0a5993023fc48ba6e380496'
  },
  dai: {
    kovan: '0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99',
    homestead: '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359'
  }
};

export const DISCOVERABLE_PROVIDERS = {
  oneClickDapp: {
    name: 'One Click Dapp',
    address: '0x9492510BbCB93B6992d8b7Bb67888558E12DCac4',
    website: 'http://oneclickdapp.com',
    description: 'Generate frontends quickly for your smart contracts',
    tags: ['open-source', 'tools', 'web3'],
    image: 'oneClickDapp'
  },
  defiant: {
    name: 'The Defiant',
    description: 'Curated newsletter on the day’s latest DeFi news',
    address: '0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99',
    website: './',
    tags: ['subscription', 'paid', 'newsletter'],
    image: 'defiant'
  },
  unicef: {
    name: 'UNICEF',
    description:
      'Protecting the rights of every child, no matter how disadvantaged',
    address: '0xA59B29d7dbC9794d1e7f45123C48b2b8d0a34636',
    website: 'https://www.unicef.org/',
    tags: ['charity', 'tax-deductible', 'humanitarian'],
    image: 'unicef'
  },
  ethhub: {
    name: 'EthHub',
    description: 'A TRUSTED SOURCE IN A TRUSTLESS WORLD',
    image: 'ethhub',
    tags: ['Education'],
    address: '0xA19FCDaD77C1F0fd184689aca88BabCF68010347',
    twitter: '@ethhub_io',
    website: 'https://ethhub.io/'
  },
  ocd: {
    name: 'One Click Dapp',
    description: 'Turning smart contracts into easy-to-use dApps',
    image: 'ocd',
    tags: ['Tooling'],
    address: '0x9492510BbCB93B6992d8b7Bb67888558E12DCac4',
    twitter: '@pi0neerpat',
    website: 'https://oneclickdapp.com'
  },
  rdai: {
    name: 'rDAO',
    description: 'Programmable interest payments for everyone',
    image: 'rdai',
    tags: ['DeFi'],
    address: '0x5D7D257d97D8a81F51187a77C6dD226Fb8424d90',
    twitter: '@rDAI_DAO',
    website: 'https://rdai.money'
  },
  altar: {
    name: 'The Altar of rDAI',
    description: 'Making rDAI offerings to open source projects',
    image: 'altar',
    tags: ['DeFi'],

    address: '0x607EBb69D568DBe1d2283668120036A892E88e89',
    twitter: '@AltarOfrDAI',
    website: 'https://altarofrdai.io/'
  },
  wizardry: {
    name: 'E.TH. Phone Home',
    description: 'Voice-calling Ethereum addresses',
    image: 'voip',
    tags: ['Wizardry'],
    address: '0x9410A73737E73E105c7CBD57bA64a3073E6A0924',
    twitter: '@ejwessel',
    website: 'https://devpost.com/software/'
  },
  threadpool: {
    name: 'threadpool',
    description: 'Engineering + Entrepreneurship',
    image: 'thread',
    tags: ['Education'],

    address: '0x18D80Ffdbd08F70B314f06Ae9D1b309135Af9405',
    twitter: '@threadpool_io',
    website: 'https://devpost.com/software/threadpool'
  },

  fliff: {
    name: 'FLiFF',
    description: 'The better way to settle up with your friends',
    image: 'fliff',
    tags: ['DeFi'],
    address: '0xaFAEfc6dd3C9feF66f92BA838b132644451F0715',
    twitter: '@AppFliff',
    website: 'https://fliff.app/'
  },
  cypher: {
    name: 'Cypherplugs',
    description: 'Freedom-enhancing Linux distro for cyber protocols',
    image: 'cypher',
    tags: ['Tooling'],
    address: '0x65d676F3Eca501b324A636933Cd3b8c4fB5D9228',
    twitter: '@cypherplugs',
    website: 'https://cypherplugs.com'
  },
  brawl: {
    name: 'Cryptobrawl',
    description: 'Interoperable NFT battleground',
    image: 'brawl',
    tags: ['Gaming'],
    address: '0x59B96e98B97f3d1A7e59dF53cb0f05E650c4FFfA',
    twitter: '@cryptobrawl',
    website: 'https://cryptobrawl.online'
  },
  blocks: {
    name: 'Blocks of Notes',
    description: 'Anonymous suggestion/complaint box with timed release',
    image: 'blocks',
    tags: ['Dapp'],
    address: '0x74B0A71a430de8022622c8dDFFe3f9EED0876207',
    twitter: '@CuteManhole',
    website: 'https://devpost.com/software/blocksofnotes'
  },
  bounty: {
    name: 'BountyUp',
    description: 'Bounties platform sustained by rDAI',
    image: 'bounty',
    tags: ['Bounties'],
    address: '0x4a7D077E676C4BF3182ce6dcc09afD3217D88bcD',
    twitter: '@cedriking',
    website: 'https://devpost.com/software/bountyup'
  },
  blocktalk: {
    name: 'Block Talk',
    description: 'E2E encrypted messaging with IPFS storage',
    image: 'blocktalk',
    tags: ['Privacy'],
    address: '0x8a68Df0029c9e8B64aD08f9a19a2f8513a4ca70b',
    twitter: '@',
    website: 'https://devpost.com/software/********'
  }
};

export const NETWORKS = {
  kovan: {
    etherscan: 'https://kovan.etherscan.io/address/'
  }
};

export const FIAT_GATEWAYS = {
  // coinbase: {
  //   name: 'Coinbase',
  //   website: '',
  //   image: 'coinbase'
  // },
  kyber: {
    name: 'Kyber Network',
    website: '',
    image: 'kyber'
  }
  // wyre: {
  //   name: 'Wyre',
  //   website: '',
  //   image: 'wyre'
  // }
};

export const CRYPTO_EXCHANGES = {};
