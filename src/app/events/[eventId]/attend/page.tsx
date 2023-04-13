"use client";
import useSWR from 'swr';
import { useMemo, useState } from "react";
import { usePathname } from 'next/navigation';
import { LockOutlined, CopyOutlined } from '@ant-design/icons';
import { Card, Col, Row, Table, Typography, Button, Skeleton, notification } from "antd";

const baseURI = process.env.NEXT_PUBLIC_API || '/api/v1/T2';

export default function DetailEvent() {
    const [size, setSize] = useState<any>('large');
    const [isAdmin, setIsAdmin] = useState(true);
    const [editableStrWithSuffix, setEditableStrWithSuffix] = useState(
        'This is a loooooooooooooooooooooooooooooooong editable text with suffix.',
    );
    const [editableStrWithSuffixStartPart, editableStrWithSuffixSuffixPart] = useMemo(
        () => [editableStrWithSuffix.slice(0, -12), editableStrWithSuffix.slice(-12)],
        [editableStrWithSuffix],
    );
    const router = usePathname();
    const pid = router?.split("/")[2].toString();
    const { data: apiCall, error, isLoading } = useSWR(`${baseURI}/${pid}`);

    const { Paragraph } = Typography;

    const openNotification = ({ message, description }: any) => {
        notification.open({
            message,
            description,
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            signature: '0x00000...',
            score: '10'
        },
        {
            key: '2',
            name: 'John',
            signature: '0x00000...',
            score: '1'
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Signature',
            dataIndex: 'signature',
            key: 'signature',
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
        },
    ]

    const copyToClipboard = (e: any) => {
        navigator.clipboard.writeText(window.location.toString())
        openNotification({
            message: 'Link copied to clipboard',
        });
    }

    return (
        <div className="img-bg">
            {(isLoading) ? <Skeleton active /> : (error) ? (
                <Skeleton active />
            ) : (
                <>
                    <Typography.Title level={1} style={{ margin: 0, color: 'white' }}>
                        {apiCall[0]?.event}
                    </Typography.Title>
                    <br />
                    <br />
                    <Row>
                        <Col span={16}>
                            <Card className="create-form boxed" bordered={false} style={{ 'color': 'white' }}>

                                <Typography.Title level={4} style={{ margin: 0 }}>
                                    Onchain Event date 📆:
                                </Typography.Title>
                                <Row>
                                    <Paragraph>
                                        {apiCall[0]?.date}
                                    </Paragraph>
                                </Row>
                                <Typography.Title level={4} style={{ margin: 0 }}>
                                    Location 📍:
                                </Typography.Title>
                                <Paragraph>
                                    {apiCall[0]?.location}
                                </Paragraph>
                                <Typography.Title level={4} style={{ margin: 0 }}>
                                    Organizer 📇:
                                </Typography.Title>
                                <Paragraph>
                                    {apiCall[0]?.organizer}
                                </Paragraph>
                                <Typography.Title level={4} style={{ margin: 0 }}>
                                    🌐Contact Information 🫶:
                                </Typography.Title>
                                <Paragraph>
                                    {apiCall[0]?.contactInformation}
                                </Paragraph>
                                <Typography.Title level={4} style={{ margin: 0 }}>
                                    Entrance fee 🎟️:
                                </Typography.Title>
                                <Paragraph>
                                    {apiCall[0]?.entranceFee}
                                </Paragraph>
                                <Typography.Title level={4} style={{ margin: 0 }}>
                                    Event description 📜:
                                </Typography.Title>
                                <Paragraph>
                                    {apiCall[0]?.eventDescription}
                                </Paragraph>

                                <Button
                                    style={{ backgroundColor: '#520339', border: 'none', color: '#fff' }}
                                    icon={<LockOutlined />}
                                    size={size}
                                    disabled={isLoading}
                                    loading={isLoading}

                                >
                                    Attend Onchain Event
                                </Button>
                                <Button
                                    icon={<CopyOutlined />}
                                    size={size}
                                    onClick={copyToClipboard}
                                    style={{ backgroundColor: '#520339', border: 'none', color: '#fff', marginLeft: '10px' }}
                                >
                                    Share link
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
                        <Col span={1}></Col>
                        <Col span={7}>
                            <Typography.Title level={2} style={{ margin: 0, color: 'white' }}>
                                Attendance
                            </Typography.Title>
                            <br />
                            <br />
                            <Table dataSource={dataSource} columns={columns} />
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <br />
                </>
            )}
        </div >
    )
}