"use client";
import { useMemo, useState } from "react";
import { Card, Col, Row, Table, Input, DatePicker, Typography, Button } from "antd";
import { LockOutlined, CopyOutlined } from '@ant-design/icons';


export default function DetailEvent() {
    const [result, setResult] = useState();
    const [size, setSize] = useState<any>('large');
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(true);
    const [error, setError] = useState<any>();
    const [editableStrWithSuffix, setEditableStrWithSuffix] = useState(
        'This is a loooooooooooooooooooooooooooooooong editable text with suffix.',
    );
    const [editableStrWithSuffixStartPart, editableStrWithSuffixSuffixPart] = useMemo(
        () => [editableStrWithSuffix.slice(0, -12), editableStrWithSuffix.slice(-12)],
        [editableStrWithSuffix],
    );
    const { Paragraph } = Typography;

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

    return (
        <div className="img-bg">

            <Typography.Title level={1} style={{ margin: 0, color: 'white' }}>
                Event name
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

                        <Button
                            style={{ backgroundColor: '#520339', border: 'none', color: '#fff' }}
                            icon={<LockOutlined />}
                            size={size}
                            disabled={loading}
                            loading={loading}
                            onClick={() => {
                                setLoading(true);
                                setError(undefined);
                                setResult(undefined);
                            }}

                        >
                            Attend Onchain Event
                        </Button>
                        <Button
                            icon={<CopyOutlined />}
                            size={size}
                            style={{ backgroundColor: '#520339', border: 'none', color: '#fff', marginLeft: '10px' }}
                        >
                            Share link
                        </Button>
                        {!error && !result && loading && (
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
        </div>
    )

}