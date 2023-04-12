"use client";
import { Card, Table, Skeleton, Typography, Space } from "antd";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import useSWR from 'swr';

import { useGetOnchainEvents } from "../../../hooks/useGetOnchainEvents";

const baseURI = process.env.NEXT_PUBLIC_API || '/api/v1/T2';

function renameData(events: any) {
    const mappedEvents = events?.map((event: any) => {
        return {
            key: event.id, // assuming you want to use the "id" field as the unique key for the table rows
            event: event.C1,
            location: event.C4,
            date: new Date(event.C2 * 1000).toLocaleString(), // convert Unix timestamp to a human-readable date string
            attenders: 0
        };
    });
    return mappedEvents;
}

export default function Events() {

    const { data: apiCall, error, isLoading } = useSWR(`${baseURI}/list`);
    const [events, setEvents] = useState<any>([]);

    useEffect(() => {
        // rename the data
        if (apiCall && !error && !isLoading) {
            const renamedData = renameData(apiCall);
            setEvents(renamedData);
        }
    }, [apiCall, error, isLoading]);

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
            {isLoading ? <Skeleton active /> : (
                <>
                    <SearchBar />
                    <Table dataSource={events} columns={columns} className="list-events" />
                </>
            )}
        </>
    );
}
