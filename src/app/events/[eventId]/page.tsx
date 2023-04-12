"use client";
import { useEffect, useMemo, useState } from "react";
import { Card, Col, Row, Table, Typography, Button, Skeleton } from "antd";
import { LockOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import { usePathname } from 'next/navigation';

const baseURI = process.env.NEXT_PUBLIC_API || '/api/v1/T2';
// @dev get eventId from url

export default function DetailEvent() {
    const router = usePathname();
    const [result, setResult] = useState();
    const [size, setSize] = useState<any>('large');
    const [loading, setLoading] = useState(false);
    const [admin, isAdmin] = useState(false);

    const pid = router?.split("/")[2].toString();
    const { data: apiCall, error, isLoading } = useSWR(`${baseURI}/${pid}`);
    const [editableStrWithSuffix, setEditableStrWithSuffix] = useState<any>('');
    const [editableStrWithSuffixStartPart, editableStrWithSuffixSuffixPart] = useMemo(
        () => [editableStrWithSuffix.slice(0, -4), editableStrWithSuffix.slice(-25)],
        [editableStrWithSuffix],
    );

    const [editableLocation, setEditableLocation] = useState<any>('');
    const [editableWithSuffixLocation, setEditableWithSuffixLocation] = useMemo(
        () => [editableLocation.slice(0, -4), editableLocation.slice(-25)],
        [editableLocation],
    );

    const { Paragraph } = Typography;

    useEffect(() => {
        if (apiCall) {
            setEditableStrWithSuffix(apiCall[0]?.date);
            setEditableLocation(apiCall[0]?.location);
        }
    }, [apiCall]);

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
    ];

    return (
        <div className="img-bg">

            {(isLoading) ? <Skeleton active /> : (error) ? (
                <>
                    {admin ? (
                        <Typography.Title level={1} editable style={{ margin: 0, color: 'white' }}>
                            Event name
                        </Typography.Title>
                    ) : (
                        <Typography.Title level={1} style={{ margin: 0, color: 'white' }}>
                            Event name
                        </Typography.Title>
                    )}
                    <br />
                    <br />
                    <Row>
                        <Col span={16}>
                            <Card className="create-form boxed" bordered={false} style={{ 'color': 'white' }}>
                                {admin ? (
                                    <>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            Onchain Event date 📆:
                                        </Typography.Title>
                                        <Row>
                                            <Paragraph
                                                editable={{
                                                    onChange: setEditableStrWithSuffix,
                                                    text: editableStrWithSuffix,
                                                }}
                                                ellipsis={{
                                                    suffix: editableStrWithSuffixSuffixPart,
                                                }}
                                            >
                                                {editableStrWithSuffixStartPart}
                                            </Paragraph>
                                        </Row>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            Location 📍:
                                        </Typography.Title>
                                        <Paragraph
                                            editable={{
                                                onChange: setEditableLocation,
                                                text: editableLocation,
                                            }}
                                            ellipsis={{
                                                suffix: setEditableWithSuffixLocation,
                                            }}
                                        >
                                            {editableWithSuffixLocation}
                                        </Paragraph>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            Organizer 📇:
                                        </Typography.Title>
                                        <Paragraph
                                            editable={{
                                                onChange: setEditableStrWithSuffix,
                                                text: editableStrWithSuffix,
                                            }}
                                            ellipsis={{
                                                suffix: editableStrWithSuffixSuffixPart,
                                            }}
                                        >
                                            {editableStrWithSuffixStartPart}
                                        </Paragraph>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            🌐Contact Information 🫶:
                                        </Typography.Title>
                                        <Paragraph
                                            editable={{
                                                onChange: setEditableStrWithSuffix,
                                                text: editableStrWithSuffix,
                                            }}
                                            ellipsis={{
                                                suffix: editableStrWithSuffixSuffixPart,
                                            }}
                                        >
                                            {editableStrWithSuffixStartPart}
                                        </Paragraph>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            Entrance fee 🎟️:
                                        </Typography.Title>
                                        <Paragraph
                                            editable={{
                                                onChange: setEditableStrWithSuffix,
                                                text: editableStrWithSuffix,
                                            }}
                                            ellipsis={{
                                                suffix: editableStrWithSuffixSuffixPart,
                                            }}
                                        >
                                            {editableStrWithSuffixStartPart}
                                        </Paragraph>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            Event description 📜:
                                        </Typography.Title>
                                        <Paragraph
                                            editable={{
                                                onChange: setEditableStrWithSuffix,
                                                text: editableStrWithSuffix,
                                            }}
                                            ellipsis={{
                                                suffix: editableStrWithSuffixSuffixPart,
                                            }}
                                        >
                                            {editableStrWithSuffixStartPart}
                                        </Paragraph>
                                    </>
                                ) : (
                                    <>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            Onchain Event date 📆:
                                        </Typography.Title>
                                        <Row>
                                            <Paragraph
                                                ellipsis={{
                                                    suffix: editableStrWithSuffixSuffixPart,
                                                }}
                                            >
                                                {editableStrWithSuffixStartPart}
                                            </Paragraph>
                                        </Row>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            Location 📍:
                                        </Typography.Title>
                                        <Paragraph
                                            ellipsis={{
                                                suffix: editableStrWithSuffixSuffixPart,
                                            }}
                                        >
                                            {editableStrWithSuffixStartPart}
                                        </Paragraph>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            Organizer 📇:
                                        </Typography.Title>
                                        <Paragraph
                                            ellipsis={{
                                                suffix: editableStrWithSuffixSuffixPart,
                                            }}
                                        >
                                            {editableStrWithSuffixStartPart}
                                        </Paragraph>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            🌐Contact Information 🫶:
                                        </Typography.Title>
                                        <Paragraph
                                            ellipsis={{
                                                suffix: editableStrWithSuffixSuffixPart,
                                            }}
                                        >
                                            {editableStrWithSuffixStartPart}
                                        </Paragraph>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            Entrance fee 🎟️:
                                        </Typography.Title>
                                        <Paragraph
                                            ellipsis={{
                                                suffix: editableStrWithSuffixSuffixPart,
                                            }}
                                        >
                                            {editableStrWithSuffixStartPart}
                                        </Paragraph>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            Event description 📜:
                                        </Typography.Title>
                                        <Paragraph
                                            ellipsis={{
                                                suffix: editableStrWithSuffixSuffixPart,
                                            }}
                                        >
                                            {editableStrWithSuffixStartPart}
                                        </Paragraph>
                                    </>
                                )}


                                <br />{
                                    admin &&
                                    <>
                                        <Button
                                            style={{ backgroundColor: '#520339', border: 'none', color: '#fff' }}
                                            icon={<LockOutlined />}
                                            size={size}
                                            disabled={loading}
                                            loading={loading}
                                            onClick={() => {
                                                setLoading(true);
                                                setResult(undefined);
                                            }}

                                        >
                                            Edit Onchain Event
                                        </Button>
                                        {!error && !result && loading && (
                                            <span>&nbsp;Note this may take a few moments.</span>
                                        )}
                                        {error && <div>
                                            <div className="error-text">{error}</div>
                                        </div>
                                        }
                                    </>
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
                </>
            ) : (
                <>
                    {admin ? (
                        <Typography.Title level={1} editable style={{ margin: 0, color: 'white' }}>
                            {apiCall[0]?.event}
                        </Typography.Title>
                    ) : (
                        <Typography.Title level={1} style={{ margin: 0, color: 'white' }}>
                            {apiCall[0]?.event}
                        </Typography.Title>
                    )}
                    <br />
                    <br />
                    <Row>
                        <Col span={16}>
                            <Card className="create-form boxed" bordered={false} style={{ 'color': 'white' }}>
                                {admin ? (
                                    <>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            Onchain Event date 📆:
                                        </Typography.Title>
                                        <Row>
                                            <Paragraph
                                                editable={{
                                                    onChange: setEditableStrWithSuffix,
                                                    text: apiCall[0]?.date,
                                                }}
                                                ellipsis={{
                                                    suffix: editableStrWithSuffixSuffixPart,
                                                }}
                                            >
                                                {editableStrWithSuffixStartPart}
                                            </Paragraph>
                                        </Row>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            Location 📍:
                                        </Typography.Title>
                                        <Paragraph
                                            editable={{
                                                onChange: setEditableStrWithSuffix,
                                                text: apiCall[0]?.location,
                                            }}
                                            ellipsis={{
                                                suffix: editableStrWithSuffixSuffixPart,
                                            }}
                                        >
                                            {editableStrWithSuffixStartPart}
                                        </Paragraph>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            Organizer 📇:
                                        </Typography.Title>
                                        <Paragraph
                                            editable={{
                                                onChange: setEditableStrWithSuffix,
                                                text: apiCall[0]?.organizer,
                                            }}
                                            ellipsis={{
                                                suffix: editableStrWithSuffixSuffixPart,
                                            }}
                                        >
                                            {editableStrWithSuffixStartPart}
                                        </Paragraph>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            🌐Contact Information 🫶:
                                        </Typography.Title>
                                        <Paragraph
                                            editable={{
                                                onChange: setEditableStrWithSuffix,
                                                text: apiCall[0]?.contactInformation,
                                            }}
                                            ellipsis={{
                                                suffix: editableStrWithSuffixSuffixPart,
                                            }}
                                        >
                                            {editableStrWithSuffixStartPart}
                                        </Paragraph>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            Entrance fee 🎟️:
                                        </Typography.Title>
                                        <Paragraph
                                            editable={{
                                                onChange: setEditableStrWithSuffix,
                                                text: apiCall[0]?.entranceFee,
                                            }}
                                            ellipsis={{
                                                suffix: editableStrWithSuffixSuffixPart,
                                            }}
                                        >
                                            {editableStrWithSuffixStartPart}
                                        </Paragraph>
                                        <Typography.Title level={4} style={{ margin: 0 }}>
                                            Event description 📜:
                                        </Typography.Title>
                                        <Paragraph
                                            editable={{
                                                onChange: setEditableStrWithSuffix,
                                                text: apiCall[0]?.eventDescription,
                                            }}
                                            ellipsis={{
                                                suffix: editableStrWithSuffixSuffixPart,
                                            }}
                                        >
                                            {editableStrWithSuffixStartPart}
                                        </Paragraph>
                                    </>
                                ) : (
                                    <>
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
                                    </>
                                )}

                                <br />{
                                    admin &&
                                    <>
                                        <Button
                                            style={{ backgroundColor: '#520339', border: 'none', color: '#fff' }}
                                            icon={<LockOutlined />}
                                            size={size}
                                            disabled={loading}
                                            loading={loading}
                                            onClick={() => {
                                                setLoading(true);
                                                setResult(undefined);
                                            }}

                                        >
                                            Edit Onchain Event
                                        </Button>
                                        {!error && !result && loading && (
                                            <span>&nbsp;Note this may take a few moments.</span>
                                        )}
                                        {error && <div>
                                            <div className="error-text">{error}</div>
                                        </div>
                                        }
                                    </>
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
                </>
            )}

            <br />
            <br />
            <br />
        </div>
    )

}