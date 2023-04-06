"use client";
import './globals.css'
import { Layout, theme } from 'antd';
import styles from "@/styles/home.module.css";
import Navbar from '@/components/Navbar';
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
        <Layout className="layout">
          <Navbar />
          <Content style={{ padding: '0 50px', color: '#fff' }}>
            <div className={styles.container}>
              <div className="site-layout-content" style={{ backgroundColor: "#121236" }}>
                {children}
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: '#fff' }}>Onchain Events ©2023 Mailthereum management events efficenly, transparency and secure</Footer>
        </Layout>
      </body>
    </html>
  )
}
