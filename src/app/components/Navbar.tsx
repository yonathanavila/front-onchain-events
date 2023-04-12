"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { Layout, Menu, theme } from 'antd';
import logo from "public/img/OnchainEventsLogo.png";
import { dafaultChainId, toHexString } from '../../utils/constants.tsx';
import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const { Header } = Layout;

export default function Navbar() {

    const path = "/";
    const router = useRouter();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [activeChain, setActiveChain] = useState(dafaultChainId);

    // Request new network on change
    const changeNetwork = async (chainId: any) => {

    }

    const handlerClick = async () => {

    }

    useEffect(() => {
        if (activeChain) {
            changeNetwork(toHexString(activeChain.id));
            setActiveChain(activeChain.id);

        }
    }, [activeChain])

    const menuItems = [
        {
            key: '/',
            label: <Image
                src={logo}
                onClick={() => router.push("/")}
                alt='logo'
                width={53}
                className='main-logo'
                height={53}
            />
        },
        {
            key: '/create',
            label: "Create Event",
            onClick: () => router.push("/create"),
        },
        {
            key: '/events',
            label: "View Events",
            onClick: () => router.push("/events"),
        },
        {
            key: '/ownerlinks',
            label:
                <div className='connect-button'>
                    <ConnectButton label={'Connect wallet'} />
                </div>

        },
    ]
    return (
        <div>
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[path]}
                    items={false ? menuItems.filter((item: any) => item?.showOnRedirectPage) : menuItems}
                    className='navbar-items'
                ></Menu>
            </Header>
        </div>
    )
}