"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Row, Col, Button } from "antd";
import logo from "public/img/OnchainEvents_main.png";
import Image from 'next/image';
import { ArrowRightOutlined, CheckCircleTwoTone } from "@ant-design/icons";


const App: React.FC = () => {

  const router = useRouter();

  return (
    <div className='hero-section'>
      <Row>
        <Col span={12}>
          <div className='hero-slogan-section'>
            <div className='hero-slogan'>
              <h1 className='title-home'>Onchain Events: A Blockchain-Based Platform for Efficient Event Management</h1>
            </div>
            <p className='home-paragraph'>
              <CheckCircleTwoTone twoToneColor={"#9B1CA8"} />
              &nbsp;
              Integration with Mailchain
            </p>
            <p className='home-paragraph'>
              <CheckCircleTwoTone twoToneColor={"#9B1CA8"} />
              &nbsp;
              Decentralized payment system
            </p>
            <p className='home-paragraph'>
              <CheckCircleTwoTone twoToneColor={"#9B1CA8"} />
              &nbsp;
              Smart contracts
            </p>
            <p className='home-paragraph'>
              <CheckCircleTwoTone twoToneColor={"#9B1CA8"} />
              &nbsp;
              Tamper-proof record of attendance
            </p>
            <p className='home-paragraph'>
              <CheckCircleTwoTone twoToneColor={"#9B1CA8"} />
              &nbsp;
              Transparency and security
            </p>
            <br />
            <Button type="primary" size="large" onClick={() => router.push("/create")} className='btn-gradient'>
              Create a new Onchain Event <ArrowRightOutlined />
            </Button>
          </div>
        </Col>
        <Col span={12}>
          <Image src={logo} width={600} className="hero-image" alt='Header-logo' />
        </Col>
      </Row>
    </div >
  );
};

export default App;