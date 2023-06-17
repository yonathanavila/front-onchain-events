"use client";
import useSWR from 'swr';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { UserOutlined } from '@ant-design/icons';
import { Card, Col, Row, Typography, Input, Skeleton, Button, notification } from "antd";

const baseURI = process.env.NEXT_PUBLIC_API || '/api/v1/T2';

export default function AttendEvent() {

    const { Title } = Typography;
    const router = usePathname();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState<any>();
    const [error, setError] = useState<any>();

    const pid = router?.split("/")[2].toString();
    const { data: apiCall, error: ErrorSWR, isLoading } = useSWR(`${baseURI}/${pid}`);

    const handleEmail = (e: any) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newData_ = {
                "userMailChain": email,
                "id": pid,
            }
            // post to /api/v1/Mail
            fetch('/api/v1/Mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData_),
            })
                .then((response) => response.json())
                .then((data) => {
                    openNotification({
                        message: 'Success',
                        description: 'Your invitation has been sent.',
                    });
                    if (data?.error) {
                        setError(data?.error);
                    }
                });
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    }

    const openNotification = ({ message, description }: any) => {
        notification.open({
            message,
            description
        });
    };

    return (
        <>
            {(isLoading) ? <Skeleton active /> : (error) ? (
                <Skeleton active />
            ) : (
                <Row>
                    <Title>Extend an invitation to you to attend - {apiCall[0]?.event}</Title>
                    <Col span={15}>
                        <Card bordered={false}>
                            <Title level={3}>{apiCall[0]?.location}</Title>
                            <Title level={4}>
                                {apiCall[0]?.description}
                            </Title>
                            <Input size="large" value={email} name="email" onChange={handleEmail} placeholder="vitalik" prefix={<UserOutlined />} suffix="@mailchain.com" />
                            <br />
                            <br />
                            <br />
                            <Button
                                style={{ backgroundColor: '#520339', border: 'none', color: '#fff' }}
                                disabled={loading}
                                loading={loading}
                                size="large"
                                onClick={handleSubmit}
                            >
                                Invite
                            </Button>
                            {!error && !apiCall && isLoading && (
                                <span>&nbsp;Note this may take a few moments.</span>
                            )}
                            {error && <div>
                                <div className="error-text">{error}</div>
                            </div>
                            }
                            <br />
                            <br />
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
}