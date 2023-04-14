import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from '../../../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { eventId, userAddress, leaf } = req.body;

    const newData = {
        C1: Number(eventId),
        C2: userAddress,
        C3: leaf,
    };

    const { data, error } = await supabase.from("T3").insert(newData).select();
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