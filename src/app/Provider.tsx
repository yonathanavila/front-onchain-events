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
import { SWRConfig } from 'swr';

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
            <SWRConfig
                value={{
                    refreshInterval: 86400,
                    fetcher: (resource, init) =>
                        fetch(resource, init).then((res) => res.json()),
                }}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#0E0E2B',
                            colorText: '#fff',
                            colorTextSecondary: '#fff',
                            colorTextDescription: 'gray',

                            colorBorder: '#600540',
                            colorBorderBg: '#600540',
                            colorBorderSecondary: '#600540',
                        },
                        components: {
                            Steps: {

                                colorBgContainer: '#fff',
                                colorBgBase: '#600540',
                                colorBgLayout: '#600540',
                                colorFill: '#600540',
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
                                colorBgBase: '#600540',
                                colorBgContainer: '#600540',
                                colorTextBase: '#181A1B',
                                colorTextLabel: '#fff',
                                colorTextPlaceholder: '#fff',
                                colorBgTextHover: '#600540',
                                colorBgTextActive: '#600540',
                                colorInfoBg: '#600540',
                                colorBgContainerDisabled: '#600540',
                                colorBgLayout: '#600540',
                                colorInfoBgHover: '#600540',
                                colorBgElevated: '#600540',
                                colorIcon: '#181A1B',
                                colorIconHover: '#181A1B',
                                colorBorder: '#600540',
                                colorBorderBg: '#600540',
                                colorBorderSecondary: '#600540',
                            },
                            Input: {
                                colorBgContainer: '#600540',
                                colorBgBase: '#600540',
                                colorBgLayout: '#600540',
                                colorFill: '#600540',
                                colorBgTextActive: '#600540',
                                colorInfoText: '#600540',
                                colorPrimaryTextActive: '#600540',
                                colorPrimaryText: '#600540',

                                colorTextLabel: '#600540',
                                colorTextBase: '#600540',
                                colorTextSecondary: '#600540',
                                colorTextDescription: 'gray',
                                colorText: '#fff'
                            },
                            Card: {
                                colorBgContainer: '#600540',
                                colorBgBase: '#600540',
                                colorBgLayout: '#600540',
                                colorFill: '#600540',
                                colorBgTextActive: '#600540',
                                colorInfoText: '#600540',
                                colorPrimaryTextActive: '#600540',
                                colorPrimaryText: '#600540',

                                colorTextLabel: '#600540',
                                colorTextBase: '#600540',
                                colorTextSecondary: '#600540',
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
            </SWRConfig>
        </div>
    )
}

export default dynamic(() => Promise.resolve(Providers), { ssr: false });
