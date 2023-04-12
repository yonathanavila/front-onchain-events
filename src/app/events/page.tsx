"use client";
import useSWR from 'swr';
import Link from "next/link";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { Table, Skeleton, Typography, Space } from "antd";

const baseURI = process.env.NEXT_PUBLIC_API || '/api/v1/T2';

export default function Events() {

    const { data: apiCall, error, isLoading } = useSWR(`${baseURI}/list`);

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
            render: (_: any, { key }: any) => (
                <Space size="middle">
                    <Link href={`/events/${key}/attend`}>Attend</Link>
                    <Link href={`/events/${key}/invite`}>Invite</Link>
                    <Link href={`/events/${key}`}>View</Link>
                </Space>
            ),
        },

    ];
    const [columns, setColumns] = useState<any>(columns_);

    const { Title } = Typography;

    return (
        <>
            <Title>Onchain Events</Title>
            <br />
            <br />
            {(isLoading) ? <Skeleton active /> : (error) ? (
                <>
                    <SearchBar />
                    <Table dataSource={[]} columns={columns} className="list-events" />
                </>
            ) : (
                <>
                    <SearchBar />
                    <Table dataSource={apiCall} columns={columns} className="list-events" />
                </>
            )}
        </>
    );
}
