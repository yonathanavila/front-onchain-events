"use client";
import './globals.css'
import { Layout, theme } from 'antd';
import styles from "@/styles/home.module.css";
import Navbar from '@/components/Navbar';
import Provider from './Provider';
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
            <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: '#fff' }}>Onchain Events ©2023 With love for <a href='https://twitter.com/developer_dao'>Developer DAO (🧱, 🚀)</a></Footer>
          </Layout>
        </Provider>
      </body>
    </html>
  )
}
