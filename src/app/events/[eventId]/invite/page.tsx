"use client";
import useSWR from 'swr';
import { usePathname } from 'next/navigation';
import { Card, Col, Row, Typography, Input, Skeleton, Button } from "antd";
import { UserOutlined } from '@ant-design/icons';

const baseURI = process.env.NEXT_PUBLIC_API || '/api/v1/T2';

export default function AttendEvent() {

    const { Title } = Typography;
    const router = usePathname();
    const pid = router?.split("/")[2].toString();
    const { data: apiCall, error, isLoading } = useSWR(`${baseURI}/${pid}`);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // post to /api/v1/Mail
        fetch('/api/v1/Mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userMailChain: 'yonathan@mailchain',
                link: 'https://mailchain.xyz'
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            });
    }

    return (
        <>
            {(isLoading) ? <Skeleton active /> : (error) ? (
                <Skeleton active />
            ) : (
                <Row>
                    <Title>Invite a friend to - {apiCall[0]?.event}</Title>
                    <Col span={15}>
                        <Card bordered={false}>
                            <Title level={3}>{apiCall[0]?.location}</Title>
                            <Title level={4}>
                                {apiCall[0]?.description}
                            </Title>
                            <Input size="large" placeholder="vitalik" prefix={<UserOutlined />} suffix="@mailchain.com" />
                            <br />
                            <br />
                            <br />
                            <Button type="primary" size="large" onClick={handleSubmit}>Invite</Button>
                            <br />
                            <br />
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
}