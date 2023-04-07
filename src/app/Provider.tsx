"use client";
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiConfig } from 'wagmi';

import { PropsWithChildren } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { wagmiClient } from '../../utils/functions/client';
import { chainSelected } from '../../utils/functions/chain';
import { chains } from '../../utils/functions/provider';

type P = PropsWithChildren;

const myCustomThem: any = {
    blurs: {
        modalOverlay: '...',
    },
    colors: {
        connectButtonBackground: '#520339',
        accentColor: '#520339',
        accentColorForeground: '#fff',
        actionButtonBorder: '#000000',
        actionButtonBorderMobile: 'e8e8e8',
        actionButtonSecondaryBackground: '#000000',
        closeButton: '#000000',
        closeButtonBackground: '#ffffff',
        connectButtonBackgroundError: '#000000',
        connectButtonInnerBackground: '#000000',
        connectButtonText: '#F6F2F5',
        connectButtonTextError: '#000000',
        connectionIndicator: '#000000',
        downloadBottomCardBackground: '#000000',
        downloadTopCardBackground: '#000000',
        error: '#000000',
        generalBorder: '#000000',
        generalBorderDim: '#000000',
        menuItemBackground: '#908e8e',
        modalBackdrop: '...',
        modalBackground: '#780650',
        modalBorder: '#520339',
        modalText: '#ffffff',
        modalTextDim: '#ffffff',
        modalTextSecondary: '#ffffff',
        standby: '#ffffff',
    },
    radii: {
        actionButton: '8px',
        connectButton: '8px',
        menuButton: '8px',
        modal: '8px',
        modalMobile: '8px',
    },
};

export default function Providers({ children }: P) {
    const chainId: any = process.env.NEXT_PUBLIC_MAINNET_TESTNET === "mainnet" ? 0 : 1;


    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
                chains={chains}
                initialChain={chainSelected[Number(chainId || 1)]}
                theme={myCustomThem}
            >
                {children}
                <Analytics />
            </RainbowKitProvider >
        </WagmiConfig>
    )
}