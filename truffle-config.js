require("babel-register");
require("babel-polyfill");
const path = require("path");
require('dotenv').config({ path: './.env' });
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const web3 = new Web3();
const MetaMaskAccountIndex = 0;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    rinkeby_infura: {
      provider: function () {
        return new HDWalletProvider(process.env.MNEMONIC, "wss://rinkeby.infura.io/ws/v3/239a6062fd364546bdceba84ab5e75fb", MetaMaskAccountIndex)
      },
      network_id: 4,
      gasPrice: web3.utils.toWei('30', 'gwei'),
      gas: 5000000,
      timeoutBlocks: 250,
      networkCheckTimeout: 999999,
      skipDryRun: true
    },
    bscTestnet: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://data-seed-prebsc-1-s1.binance.org:8545`, MetaMaskAccountIndex),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      version: "0.8.0",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.API_KEY
  }
};
