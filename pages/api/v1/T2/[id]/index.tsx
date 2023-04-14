import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../../lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id } = req.query;

    const { data, error } = await supabase.from("T2").select('*').eq('id', id)
    if (error) {
        res.status(404).send(error);
    }

    if (data && data.length > 0) {
        const newData: any = renameData(data);

        res.status(200).send(newData);
    } else {
        res.status(404).send("Not found");
    }
}

function renameData(events: any) {
    const mappedEvents = events?.map((event: any) => {
        return {
            key: event.id, // assuming you want to use the "id" field as the unique key for the table rows
            event: event.C1,
            date: `Start at ${new Date(event.C2 * 1000).toLocaleString()}, end at ${new Date(event.C3 * 1000).toLocaleString()}`, // convert Unix timestamp to a human-readable date string
            location: event.C4,
            organizer: event.C5,
            contactInformation: event.C6,
            entranceFee: event.C7,
            eventDescription: event.C8,
            root: event.C9,
        };
    });
    return mappedEvents;
}