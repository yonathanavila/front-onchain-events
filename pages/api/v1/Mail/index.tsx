import { NextApiRequest, NextApiResponse } from "next";
var Mailchain = require('@mailchain/sdk').Mailchain;
import { supabase } from '../../../../lib/supabase';

var mailchain = Mailchain.fromSecretRecoveryPhrase(process.env.SECRET_RECOVERY_PHRASE);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userMailChain, id } = req.body;
    const pattern = /userMailChain/;
    const awesomemail = pattern.test(userMailChain) ? `${userMailChain}@mailchain.com` : userMailChain;
    console.log(awesomemail);
    try {
        const { data, error } = await supabase.from("T2").select('*').eq('id', id);
        const result: any = data;
        var sender = await mailchain.user();
        const link = `https://front-onchain-events.vercel.app/events/${id}/attend`;
        const invitationLetter = `Dear Guest,

        You are cordially invited to attend the ${result[0]?.C1} event on ${new Date(result[0]?.C2 * 1000).toLocaleString()} at ${result[0]?.C4}. The event will feature live music, food and drinks, and an opportunity to network with like-minded individuals.
        
        We look forward to seeing you there!
        
        Sincerely,
        ${result[0]?.C6}`;
        var msg = {
            to: [createMailchainAddress(awesomemail)],
            from: sender.address,
            subject: `Invitation to ${result[0]?.C1} event`,
            content: {
                text: 'In order to complete your registration and secure your attendance at the event, please click on the link below. This will take you to the registration page where you can provide your information and confirm your attendance.\r\n\r\n' + link,
                html:
                    invitationLetter +
                    '<p>Click the link below to finish to attent in to Onchain Events.</p><p><a href="' +
                    link +
                    '">Attent event</a></p>',
            },
        };
        const result_ = await mailchain.sendMail(msg);
        res.status(200).send(result_);

    } catch (error) {
        res.status(400).send(error);

    }
}

let createMailchainAddress = function (address: any) {
    switch (address) {
        case address.match(/^[\d\w\-\_]*@mailchain\.com$/)?.input: // Mailchain address:
            return address;
        case address.match(/^0x[a-fA-F0-9]{40}$/)?.input: // Ethereum address:
            return address + '@ethereum.mailchain.com';
        case address.match(/^.*\.eth$/)?.input: // ENS address:
            return address + '@ens.mailchain.com';
        case address.match(/^.*\.*@mailchain$/)?.input: // Mailchain address without .com:
            return address + '.com';
        default:
            console.error('Invalid address');
    }
};