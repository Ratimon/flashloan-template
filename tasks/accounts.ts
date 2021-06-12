import {HardhatRuntimeEnvironment} from 'hardhat/types';
import { Signer } from "@ethersproject/abstract-signer";
import { task } from "hardhat/config";

export default async () => { 

  task( 'accounts', 'Prints the list of accounts',
    async (_taskArgs, hre: HardhatRuntimeEnvironment) => {
      const accounts: Signer[] = await hre.ethers.getSigners();

      for (const account of accounts) {
        console.log(await account.getAddress());
      }
  })
}