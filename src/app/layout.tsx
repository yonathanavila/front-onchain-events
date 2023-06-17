"use client";
import './globals.css'
import Provider from './Provider';
import { Layout, theme } from 'antd';
import Navbar from '@/components/Navbar';
import styles from "@/styles/home.module.css";

const { Content, Footer } = Layout;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <html lang="en">
      <head />
      <body>
        <Provider>
          <Layout className="layout">
            <Navbar />
            <Content style={{ padding: '0 50px', color: '#fff' }}>
              <div className={styles.container}>
                <div className="site-layout-content" >
                  {children}
                </div>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: '#fff' }}>Onchain Events ©2023 Mailthereum management events efficenly, transparency and secure</Footer>
          </Layout>
        </Provider>
      </body>
    </html>
  )
}
