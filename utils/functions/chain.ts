import { gnosis, scrollTestnet, Chain, baseGoerli, zkSyncTestnet } from 'wagmi/chains';

export const chainSelected: Chain[] = [scrollTestnet, gnosis, baseGoerli, zkSyncTestnet];
console.log(chainSelected);