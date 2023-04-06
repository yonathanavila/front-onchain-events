"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { Layout, Menu, Select, Button, theme } from 'antd';
import logo from "public/images/OnchainEventsLogo.png";
import { capitalize, chains, dafaultChainId, toHexString } from '../../utils/constants';
import { useEffect, useState } from 'react';

const { Header } = Layout;

export default function Navbar() {

    const path = "/";
    const router = useRouter();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { Option } = Select;
    const [activeChain, setActiveChain] = useState(dafaultChainId);
    const [account, setAccount] = useState(undefined);
    const [loading, setLoading] = useState(false);

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
                width={63}
                className='main-logo'
                height={63}
            />,
            showOnRedirectPage: true,
        },
        {
            key: '/create',
            label: "Create Event",
            onClick: () => router.push("/create"),
        },
        {
            key: '/history',
            label: "View Events",
            onClick: () => router.push("/history"),
        },
        {
            key: '/ownerlinks',
            label:
                <span>
                    {
                        !account &&
                        <span>
                            <Button style={{ width: 175, textAlign: 'left', backgroundColor: '#520339', color: '#D2BDCB' }} type="primary" onClick={handlerClick} loading={loading} disabled={loading}>Login with Metamask</Button>
                        </span>
                    }
                    {account && <span onClick={() => router.push('/ownerlinks')}><span>Hello: {account}</span>&nbsp;</span>}

                </span>,
            showOnRedirectPage: true,

        },
        {
            key: 1,
            label: <span>
                Network:&nbsp;
                <Select
                    defaultValue={534353}
                    style={{ width: 175, textAlign: 'left', backgroundColor: '#001529', color: '#B516AB' }}
                    onChange={(a) => setActiveChain(chains[a])}
                >
                    {Object.values(chains).map((chain: any, i) => {
                        return (
                            <Option key={i} value={chain?.id} style={{ backgroundColor: '#001529', color: '#B516AB' }}>
                                {capitalize(chain.name)}
                            </Option>
                        );
                    })}
                </Select>
            </span>
            , showOnRedirectPage: true,

        },
    ]


    return (

        <Header>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[path]}
                items={false ? menuItems.filter(item => item.showOnRedirectPage) : menuItems}

            ></Menu>
        </Header>
    )
}