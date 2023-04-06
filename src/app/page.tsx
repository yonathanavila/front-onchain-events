"use client";
import React from 'react';
import { Row, Col, Button } from "antd";
import logo from "../../public/images/onchainEvents.png";
import Image from 'next/image';


const App: React.FC = () => {
  return (
    <div className='hero-section'>
      <Row>
        <Col span={12}>
          <h1>MailThereum OnChain Events: A Blockchain-Based Platform for Efficient Event Management</h1>

        </Col>
        <Col span={12}>
          <Image src={logo} width={500} className="hero-image" alt='Header-logo' />
        </Col>
      </Row>
    </div>
  );
};

export default App;