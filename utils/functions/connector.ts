import { chains } from './provider';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, trustWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';


export const connectors = connectorsForWallets([
	{
		groupName: 'Recommended',
		wallets: [metaMaskWallet({ chains }), trustWallet({ chains })]
	},
	{
		groupName: 'Others',
		wallets: [walletConnectWallet({ chains })]
	}
]);
