import { ethers } from 'ethers';

export async function GetCurrentBlockNumber() {
  try {
    // create a new instance of ethers.js provider
    const providerURL: any = 'https://testnet.era.zksync.dev';
    const provider: any = new ethers.providers.JsonRpcProvider(providerURL);

    // get the current block number
    const result: any = await provider.getBlockNumber();
    return result;

  } catch (error) {
    throw new Error('Error retrieving block number:')
  }

}