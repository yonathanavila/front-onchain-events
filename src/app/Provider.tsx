"use client";
import '@rainbow-me/rainbowkit/styles.css';
import dynamic from 'next/dynamic';
import { WagmiConfig } from 'wagmi';
import { PropsWithChildren } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { wagmiClient } from '../../utils/functions/client';
import { chainSelected } from '../../utils/functions/chain';
import { chains } from '../../utils/functions/provider';
import { ConfigProvider } from 'antd';

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
        connectButtonBackgroundError: '#520339',
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
        modalBackground: '#120E1D',
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

function Providers({ children }: P) {
    const chainId: any = process.env.NEXT_PUBLIC_MAINNET_TESTNET === "mainnet" ? 0 : 0;


    return (
        <div>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#780650',
                        colorText: '#fff',
                        colorTextSecondary: '#fff',
                        colorTextDescription: 'gray',

                        colorBorder: '#780650',
                        colorBorderBg: '#780650',
                        colorBorderSecondary: '#780650',
                    },
                    components: {
                        Steps: {

                            colorBgContainer: '#fff',
                            colorBgBase: '#780650',
                            colorBgLayout: '#780650',
                            colorFill: '#780650',
                            colorBgTextActive: '#fff',
                            colorInfoText: '#fff',
                            colorPrimaryTextActive: '#fff',
                            colorPrimaryText: '#fff',

                            colorTextLabel: '#fff',
                            colorTextBase: '#fff',
                            colorTextSecondary: '#fff',
                            colorTextDescription: 'gray',
                            colorText: '#fff'
                        },
                        Table: {
                            colorBgBase: '#780650',
                            colorBgContainer: '#780650',
                            colorTextBase: '#fff',
                            colorTextLabel: '#fff',
                            colorTextPlaceholder: '#fff',
                            colorBgTextHover: '#780650',
                            colorBgTextActive: '#780650',
                            colorInfoBg: '#780650',
                            colorBgContainerDisabled: '#780650',
                            colorBgLayout: '#780650',
                            colorInfoBgHover: '#780650',
                            colorBgElevated: '#780650',
                            colorIcon: '#fff',
                            colorIconHover: '#fff',
                            colorBorder: '#780650',
                            colorBorderBg: '#780650',
                            colorBorderSecondary: '#780650',
                        },
                        Input: {
                            colorBgContainer: '#780650',
                            colorBgBase: '#780650',
                            colorBgLayout: '#780650',
                            colorFill: '#780650',
                            colorBgTextActive: '#780650',
                            colorInfoText: '#780650',
                            colorPrimaryTextActive: '#780650',
                            colorPrimaryText: '#780650',

                            colorTextLabel: '#780650',
                            colorTextBase: '#780650',
                            colorTextSecondary: '#780650',
                            colorTextDescription: 'gray',
                            colorText: '#fff'
                        },
                        Card: {
                            colorBgContainer: '#780650',
                            colorBgBase: '#780650',
                            colorBgLayout: '#780650',
                            colorFill: '#780650',
                            colorBgTextActive: '#780650',
                            colorInfoText: '#780650',
                            colorPrimaryTextActive: '#780650',
                            colorPrimaryText: '#780650',

                            colorTextLabel: '#780650',
                            colorTextBase: '#780650',
                            colorTextSecondary: '#780650',
                            colorTextDescription: 'gray',
                            colorText: '#fff'
                        }
                    }
                }}
            >
                <WagmiConfig client={wagmiClient}>
                    <RainbowKitProvider
                        chains={chains}
                        initialChain={chainSelected[Number(chainId || 0)]}
                        theme={myCustomThem}
                    >
                        {children}
                    </RainbowKitProvider >
                </WagmiConfig>
            </ConfigProvider>
        </div>
    )
}

export default dynamic(() => Promise.resolve(Providers), { ssr: false });
