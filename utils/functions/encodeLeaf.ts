import { ethers } from "ethers";

export const encodedLeaf = (leaf: string) => {
  return ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['bytes32'], [leaf]));
}
