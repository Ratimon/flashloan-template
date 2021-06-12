// import { config as dotenvConfig } from "dotenv";
import 'dotenv/config';
import {HardhatUserConfig} from 'hardhat/types';
// import { NetworkUserConfig } from "hardhat/types";

//  require('dotenv').config();
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import 'hardhat-deploy-ethers';
// require("@nomiclabs/hardhat-ethers");
import '@nomiclabs/hardhat-waffle';
//  require('@nomiclabs/hardhat-waffle');
import "hardhat-typechain";
import 'hardhat-deploy';
import 'hardhat-tracer';
import "@tenderly/hardhat-tenderly"



import tasks from './tasks'
for (const tsk of tasks) { tsk() }

const PRIVATE_KEY = process.env.PKEY;
const MNEMONIC = process.env.MKEY;

const config: HardhatUserConfig = {

  namedAccounts: {
    deployer: 0,
    user1: 1,
    attacker: 2,

    ///-------------------tag---tokens-------------------///
    zero: "0x0000000000000000000000000000000000000000",
    busd: {
      31337: "0xeb3273FcfaBc607FA504Ac5A6d77B78908C9244E", // Mapped from  ORO Contract
      56: "0x0000000000000000000000000000000000000000", //TODO
      97: "0xF9FA987240cFAA31fD11194A522C49201B087ca8",
    },


  },

  networks: {

    hardhat: {
      chainId: 31337,
      // mining: {
      //   auto: false,
      //   interval: 1000
      // },
      accounts: {
        count: 10,
        initialIndex: 0,
        mnemonic: `${MNEMONIC}`,
        path: "m/44'/60'/0'/0",
      },
        throwOnTransactionFailures: true,
        // if true,  throw stack traces on transaction failures.
        // If false, return  failing transaction hash.
        throwOnCallFailures: true,
        // If is true, will throw  stack traces when a call fails.
        // If false, will return the call's return data, which can contain a revert reason
        live: false,
        saveDeployments: false,
        tags: ["test", "local"]
    },

    local: {
			url: 'http://127.0.0.1:8545',
      chainId: 31337,
      // accounts: "remote",
      accounts: {
        count: 10,
        initialIndex: 0,
        mnemonic: `${MNEMONIC}`,
        path: "m/44'/60'/0'/0",
      },
      live: false,
      throwOnTransactionFailures: false,
      // if true,  throw stack traces on transaction failures.
      // If false, return  failing transaction hash.
      throwOnCallFailures: false,
      // If is true, will throw  stack traces when a call fails.
      // If false, will return the call's return data, which can contain a revert reason
      saveDeployments: true,
	  },

    // rinkeby: {
    //   url: INFURA_URL,
    //   accounts: [`0x${PRIVATE_KEY}`]
    // },

    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      gasPrice: 20000000000,
      // accounts: [`0x${PRIVATE_KEY}`]
      accounts: {
        count: 10,
        initialIndex: 0,
        mnemonic: `${MNEMONIC}`,
        path: "m/44'/60'/0'/0",
      }

    },

    // bscMainnet: {
    //   url: "https://bsc-dataseed.binance.org/",
    //   chainId: 56,
    //   gasPrice: 20000000000,
    //   accounts: [`0x${PRIVATE_KEY}`]
    // }

  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey:''  //bsctestnet
  },

  solidity: {

    compilers: [
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },

      // {
      //   version: ">=0.6.0 <0.8.0;",
      //   settings: {
      //     optimizer: {
      //       enabled: true,
      //       runs: 200
      //     }
      //   }
      // }
    ],


  },

  paths: {
    sources: './contracts',
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
    deploy: './deploy',
    deployments: './deployments',
    imports: './imports'
  },

  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },

  mocha: {
    timeout: 70000
  },
  
  tenderly: {
    username: "Ratimon",
    project: "jrepo"
  }
  
  
};

export default config;