require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { INFURA_API_KEY, MNEMONIC } = process.env;

module.exports = {

  contracts_build_directory: "..front/src/contract/contracts",

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    goerli: {
      provider: () => new HDWalletProvider(MNEMONIC, INFURA_API_KEY),
      network_id: '5',
      gas: 4465030,
      networkCheckTimeout: 10000000,
      timeoutBlocks: 20000
    }
  },

  // Set default mocha options here, use special reporters, etc.

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",      // Fetch exact version from solc-bin (default: truffle's version)

    }
  },
};
