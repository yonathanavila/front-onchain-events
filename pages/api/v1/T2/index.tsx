import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from '../../../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { event_name, event_date_start, event_date_end, event_location, event_organizer, event_organizer_email, event_fee, event_description, root } = req.body;

    const newData = {
        C1: event_name,
        C2: getTime(event_date_start),
        C3: getTime(event_date_end),
        C4: event_location,
        C5: event_organizer,
        C6: event_organizer_email,
        C7: event_fee,
        C8: event_description,
        C9: root
    };

    const { data, error } = await supabase.from("T2").insert(newData).select();
    if (error) {
        res.status(404).send(error);
    }

    if (data && data.length > 0) {
        res.status(200).send(data);
    } else {
        res.status(404).send("Not found");
    }

    res.status(200).send(newData);
}

function getTime(time: any): number {
    const timestamp = new Date(time).getTime() / 1000;
    return timestamp
}