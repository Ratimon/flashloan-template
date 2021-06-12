# TODO lists

## Add Hardhat template's Feature

- [ ] Add Trezor and Ledger Providers, so BIP31922 mnemonic word can be used with hardware wallet
- [ ] Integate with **hardhat-etherscan** Plugin so the source code verification process can be automated
- [ ] Integate with **hardhat-log-remover** Plugin so the we can clean up smart contract after finishing debuging
- [ ] Integate with **Openzeppelin's defender** , so Account Management Features like Multisignature wallet could be added

## Add following Tasks
- [ ] Transfer ownership
- [ ] Verify Contract
- [ ] Update an on-chain oracle with external data
- [ ] Repalce a depreciated contract with a new verion
- [ ] Pause the contract in emergency situation


# Documentation


# 1. Setting up the environment

## Installing Node.js

### MacOS

Make sure you have `git` installed. Otherwise, follow [these instructions](https://www.atlassian.com/git/tutorials/install-git).

There are multiple ways of installing Node.js on MacOS. We will be using [Node Version Manager (nvm)](http://github.com/creationix/nvm). Copy and paste these commands in a terminal:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh | bash
nvm install 12.19.1
nvm use 12.19.1
nvm alias default 12.19.1
npm install npm --global # Upgrade npm to the latest version
```

## Installing yarn

We are going to use [yarn](yarnpkg.com)

To install it do the following:

```
npm install -g yarn
```

# 2. Creating a new Hardhat project

We'll install **Hardhat** using the npm CLI. The **N**ode.js **p**ackage **m**anager is a package manager and an online repository for JavaScript code.

Open a new terminal, go to the directory and run these commands:

```
yarn init --yes
yarn add -D hardhat
```

In the same directory where you installed **Hardhat** add a `hardhat.config.ts` (we are going to use typescript and use solidity 0.5.17 compiler)

```typescript
import {HardhatUserConfig} from 'hardhat/types';
const config: HardhatUserConfig = {
  solidity: {
    version: '0.5.17',
  }
};
export default config;

```

## Install Dependenciies

For example, if we want to add more dependecied we just use:

```
yarn add -D hardhat-deploy @ethersproject/abstract-signer chai chai-ethers mocha @types/chai @types/mocha @types/node typescript ts-node dotenv
```
```
These are libraries regarding typescript:
```
yarn add -D hardhat-typechain typechain ts-generator
```
These are libraries regarding smart contract testing:

```
yarn a
yarn add -D @nomiclabs/hardhat-waffle 'ethereum-waffle@^3.0.0' @nomiclabs/hardhat-ethers 'ethers@^5.0.0'
```
dd -D @typechain/ethers-v5
```
To support **openzeppelin-test-helpers**
```
yarn add -D @nomiclabs/hardhat-truffle5
```

```
yarn add hardhat-tracer
```
```
yarn add -D @tenderly/hardhat-tenderly
brew tap tenderly/tenderly
brew install tenderly
```

However, there is sometimes ploblem with  **hardhat-deploy-ethers** dependency. Here is a way to fix:
```
yarn add -D  @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers
```


Edit `hardhat.config.ts` so that it looks as in our repository:


We also create the following `tsconfig.json` :

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "forceConsistentCasingInFileNames": true,
    "outDir": "dist"
  },
  "include": [
    "hardhat.config.ts",
    "./deploy",
    "./test",
  ]
}
```

## Add .gitignore

We need to create the following `.gitignore` :

```env
# See http://help.github.com/ignore-files/ for more about ignoring files.

# compiled output
/dist
/tmp
/out-tsc
# Only exists if Bazel was run
/bazel-out

# dependencies
/node_modules

# profiling files
chrome-profiler-events.json
speed-measure-plugin.json

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.history/*

# misc
/.sass-cache
/connect.lock
/coverage
/libpeerconnection.log
npm-debug.log
yarn-error.log
testem.log
/typings

# System Files
.DS_Store
Thumbs.db
.env
```

## Add .env

We also create the following `.env` :

```env
PKEY=----your--privatekey----
MKEY=-----your--mnemonic----
```

We can go to [vanity-eth](https://vanity-eth.tk/) in order to generate such Private key

We could ask mock BNB for testing purpose by go to
[testnet.binance.org](https://testnet.binance.org/faucet-smart) 



# 3. compiling smart contracts

## Compiling contracts

To compile the contract run `yarn hardhat compile` in your terminal. The `compile` task is one of the built-in tasks.

```
$ yarn hardhat compile
Compiling 1 file with 0.5.19
Compilation finished successfully
```

# 4. Deployments Scripts

All **deployment scripts** are written in `/tasks` folder

We speify **The network** to deploy the smart contract with  **--network** as parameter

In each script, relevant **tags** are specified so we can use **--tags** as parameter

```typescript
func.tags = ['tokens'];
```

After each step, **hardhat.config.ts** needs to be updated regarding to newly deployed accounts. We can searh through terminal command with keyword  `key` or `We may update these following addresses at hardhatconfig.ts`

1) Deploy Mock Synthetic and Utility Tokens

::: tip
 All artifacts are stored in `/Deployments` folder but it stores only latest one. For example, **TestToken.jon** contains address only latest so only one of BUSD, JFIN and GASH is stored)
:::

```
yarn hardhat --network hardhat deploy --tags testtokens
```

```
yarn hardhat --network hardhat deploy --tags tokens
```

```
yarn hardhat --network bscTestnet deploy --tags tokens
```

(Note: After the script has been sucessfully run, we may either need to or choose to update deployed contract addresses at `helper-hardhat-config.ts` as specified in command line in the desired network)

2) Deploy Protocol
```
yarn hardhat --network hardhat deploy --tags 'protocol'
```

```
yarn hardhat --network bscTestnet deploy --tags 'protocol'
```
Or we may run each sub-step using 
```
yarn hardhat --network bscTestnet deploy --tags 2-3
```

::: tip
If we messed up, we may redepoly by simply go to `/Deployments` and delete history data eg. `/bscTestnet` and run the scripts again
:::


# 5. Running Manual Tasks

All **tasks** are written in `/tasks` folder


1) **Accounts** - list all of accounts currently using in the runtime environment

```
yarn hardhat --network bscTestnet accounts
```
2) **balance** - specify balance in the given account 

**Param: account** : Address from **Accounts** task 

```
yarn hardhat --network bscTestnet  balance --account 0xD1c4373F6acAf2aCd1A874d0748845ed179E97DC
```
2) **block-number** - specify the current block number
```
yarn hardhat --network bscTestnet block-number
```

# 5. TDD Scripts

adding the --logs after your test command.

```
yarn hardhat test --logs
```



# Naming Convention & Pipeline

## Commit Message Convention

- *task*(*scope*): *task-id* *message*

- feat
- fix
- chore
- Refactor
- test
- build
- docs

(eg. docs(./README.md): Add Naming Convention)

(eg.  chore (./) : cleaning up used comments and files)

(eg.  feat  (./) : Build working TDD environment)


(eg.  fix && test (./deploy && ./test ): Fixing deploy scripts to allow running  with  hardhat  network as well as refactoring hardhat.config.ts && adding working minter test suites
)

## Workflow for Internal USe

**for Author**

```
git checkout main
git pull
git checkout test
git pull origin main
git add .
git commit -m 'docs(./README.md): Add Naming Convention'
git rebase -i main
git checkout main
git merge test
git push origin main
```
**for collaboration**

```
git checkout main
git pull upstream main
git status
git push
git checkout test
git pull upstream main
git status
git push
git add .
git commit -m 'docs(./README.md): Add Naming Convention'
git push -u origin test
```
Then create a pull request for ‘new_branch’
