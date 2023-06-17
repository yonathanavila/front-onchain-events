import { ethers } from "ethers"

export const validAddress = (address: any) => {
  try {
    ethers.utils.getAddress(address);
    return false;
  } catch (error) {
    return true;
  }
}