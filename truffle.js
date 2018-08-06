require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    poa: {
      provider: function() {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          `https://poa.infura.io/${process.env.INFURA_API_KEY}`
        )
      },
      network_id: 99,
      gas: 500000,
      gasPrice: 1000000000
    },
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
