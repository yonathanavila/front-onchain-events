import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../../lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { data, error } = await supabase.from("T2").select('*');

    if (error) {
        res.status(404).send(error);
    }

    if (data && data.length > 0) {
        res.status(200).send(data);
    } else {
        res.status(404).send("Not found");
    }
}