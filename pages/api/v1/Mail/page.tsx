import { NextApiRequest, NextApiResponse } from "next";
var Mailchain = require('@mailchain/sdk').Mailchain;
var mailchain = Mailchain.fromSecretRecoveryPhrase(process.env.SECRET_RECOVERY_PHRASE);


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userMailChain, link } = req.body;
    console.log(req.body);

    var sender = await mailchain.user();

    console.log(sender);
    console.log(userMailChain);
    console.log(link);

    var msg = {
        to: [createMailchainAddress(userMailChain)],
        from: sender.address,
        subject: 'Sign in to Todos',
        content: {
            text: 'Hello! Click the link below to finish signing in to Todos.\r\n\r\n' + link,
            html:
                '<h3>Hello!</h3><p>Click the link below to finish signing in to Todos.</p><p><a href="' +
                link +
                '">Sign in</a></p>',
        },
    };
    return await mailchain.sendMail(msg);
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