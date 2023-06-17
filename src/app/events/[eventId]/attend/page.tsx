"use client";
import useSWR from 'swr';
import { useMemo, useState } from "react";
import { usePathname } from 'next/navigation';
import { useProvider, useSigner, useAccount } from 'wagmi';
import { LockOutlined, CopyOutlined } from '@ant-design/icons';
import { AttendOnchainEvent } from '@/utils/functions/OnchainEvents/Attend';
import { Card, Col, Row, Table, Typography, Button, Skeleton, notification, Modal, Input } from "antd";

const baseURI = process.env.NEXT_PUBLIC_API || '/api/v1/T2';
const chainId: any = process.env.NEXT_PUBLIC_MAINNET_TESTNET === "mainnet" ? 280 : 280;

export default function DetailEvent() {
    const [result, setResult] = useState<any>();
    const [size, setSize] = useState<any>('large');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState<any>();
    const [editableStrWithSuffix, setEditableStrWithSuffix] = useState(
        'This is a loooooooooooooooooooooooooooooooong editable text with suffix.',
    );
    const [editableStrWithSuffixStartPart, editableStrWithSuffixSuffixPart] = useMemo(
        () => [editableStrWithSuffix.slice(0, -12), editableStrWithSuffix.slice(-12)],
        [editableStrWithSuffix],
    );
    const router = usePathname();
    const pid = router?.split("/")[2].toString();
    const { data: apiCall, error: errorSWR, isLoading } = useSWR(`${baseURI}/${pid}`);
    const { data: signer } = useSigner(chainId);
    const provider = useProvider(chainId);
    const [error, setError] = useState<any>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEmail = (e: any) => {
        setEmail(e.target.value);
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        handleAttend();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const { address } = useAccount()

    const { Paragraph } = Typography;

    const handleAttend = async () => {
        if (!provider || !signer) {
            return;
        }
        try {
            setLoading(true);
            await AttendOnchainEvent(provider, signer, apiCall[0]?.root);
            const newData = {
                eventId: pid,
                userAddress: address,
                leaf: `${apiCall[0]?.root}`
            };
            const response = await fetch('/api/v1/T3', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
            const data = await response.json();
            if (data.error) {
                setError(data.error);
            } else {
                setResult(data);
                /// send email attestation
                const newData_ = {
                    "userMailChain": email,
                    "id": pid,
                }

                const response = await fetch('/api/v1/Mail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newData_),
                });
                const data_ = await response.json();
                if (data_.error) {
                    setError(data_.error);
                } else {
                    setResult(data_);
                    setIsModalOpen(false);
                    openNotification({
                        message: 'Success',
                        description: 'You have successfully attended the event',
                    });
                }
            }

            setLoading(false);
        } catch (error: any) {
            console.error(error);
        }
    }

    const openNotification = ({ message, description }: any) => {
        notification.open({
            message,
            description
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
            {(isLoading) ? <Skeleton active /> : (errorSWR) ? (
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
                                <Modal title="Mailchain" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                    <Input
                                        value={email}
                                        name="email"
                                        required={true}
                                        className="form-control"
                                        prefix="Mailchain :"
                                        placeholder="vitalik"
                                        onChange={handleEmail}
                                    />
                                    {!error && !result && loading && (
                                        <span>&nbsp;Note this may take a few moments.</span>
                                    )}
                                    {error && <div>
                                        <div className="error-text">{error}</div>
                                    </div>
                                    }
                                </Modal>
                                <Button
                                    style={{ backgroundColor: '#520339', border: 'none', color: '#fff' }}
                                    icon={<LockOutlined />}
                                    size={size}
                                    disabled={loading}
                                    loading={loading}
                                    onClick={showModal}

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
                                {!errorSWR && !apiCall && isLoading && (
                                    <span>&nbsp;Note this may take a few moments.</span>
                                )}
                                {errorSWR && <div>
                                    <div className="error-text">{errorSWR}</div>
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

