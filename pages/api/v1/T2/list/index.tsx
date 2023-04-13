import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../../lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { data, error } = await supabase.from("T2").select('*');

        if (error) {
            res.status(404).send(error);
        }

        if (data && data.length > 0) {
            const newData: any = renameData(data);
            res.status(200).send(newData);
        } else {
            res.status(404).send("Not found");
        }
    } catch (e) {
        res.status(404).send("Not found");
    }
}

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