import { useEffect, useState } from 'react';
import useSWR from 'swr';

const baseURI = process.env.NEXT_PUBLIC_API || '/api/v1/T2';


export function useGetOnchainEvents() {
    const [onchainEvents, setOnchainEvents] = useState<any>();
    const { data: apiCall, error, isLoading } = useSWR(`${baseURI}/list`);

    useEffect(() => {
        if (apiCall && !error && !isLoading) {
            setOnchainEvents(apiCall);
        }
    }, [apiCall, error, isLoading]);

    return { onchainEvents, isLoading, error };
}