"use client";
import { Card, Col, Row, Typography, Input } from "antd";
import { UserOutlined } from '@ant-design/icons';

export default function AttendEvent() {

    const { Title } = Typography;

    return (
        <>
            <Row>
                <Title>Invite a friend to - Grande de Grandes</Title>
                <Col span={15}>
                    <Card bordered={false}>
                        <Title level={3}>LA ESPERANZA, INTIBUCÁ</Title>
                        <Title level={4}>
                            &quotLA CIUDAD DEL MANTO BLANCO&quot
                        </Title>
                        <Input size="large" placeholder="vitalik" prefix={<UserOutlined />} suffix="@mailchain.com" />
                        <br />
                        <br />
                    </Card>
                </Col>
            </Row>
        </>
    );
}