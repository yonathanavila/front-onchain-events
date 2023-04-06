"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { Layout, Menu, theme } from 'antd';
import logo from "public/images/OnchainEventsLogo.png";

const { Header } = Layout;

export default function Navbar() {

    const path = "/";
    const router = useRouter();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

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