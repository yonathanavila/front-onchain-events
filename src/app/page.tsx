"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import logo from "public/images/onchain.jpeg";
import styles from "@/styles/home.module.css";
const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const router = useRouter();

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

  const path = "/";

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[path]}
          items={false ? menuItems.filter(item => item.showOnRedirectPage) : menuItems}

        ></Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className={styles.container}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content" style={{ background: colorBgContainer }}>
            Content
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default App;