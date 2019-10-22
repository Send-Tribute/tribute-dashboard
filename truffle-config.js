require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  contracts_build_directory: "",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    }
  },

  mocha: {
    // timeout: 100000
  },
}
