"use client";
import { Card, Table, Skeleton, Typography, Space } from "antd";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";


export default function Events() {

    const dataSource_ = [
        {
            key: '1',
            event: 'Mike',
            location: 'Barrio la cumbre',
            date: '10 Downing Street',
            attenders: 10
        },
        {
            key: '2',
            event: 'John',
            location: 42,
            date: '10 Downing Street',
            attenders: 10
        },
    ];
    const columns_ = [
        {
            title: 'Event',
            dataIndex: 'event',
            key: 'event',
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Attenders',
            dataIndex: 'attenders',
            key: 'attenders',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Link href={'/events/1/invite'}>Attend</Link>
                    <Link href={'/events/1/invite'}>Invite</Link>
                </Space>
            ),
        },

    ];
    const [source, setSource] = useState<any>(dataSource_);
    const [columns, setColumns] = useState<any>(columns_);
    const [loading, setLoading] = useState<boolean>(false);

    const { Title } = Typography;
    const { Meta } = Card;

    return (
        <>
            <Title>Onchain Events</Title>
            <br />
            <br />
            {loading ? <Skeleton active /> : (
                <>
                    <SearchBar />
                    <Table dataSource={source} columns={columns} />
                </>
            )}
        </>
    );
}