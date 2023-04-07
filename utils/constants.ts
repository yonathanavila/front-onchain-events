export const dafaultChainId: any = 534353;

export function capitalize(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const toHexString = (number: any) => {
    return "0x" + Number(number).toString(16);
}

export const stepsList = [
    {
        title: "Fill in fields",
        description: "Verify the information provided by organizer during registration, including their name, email address, and attendance information."
    },
    {
        title: "Create Onchain Event",
        description: "Create a new entry on the blockchain to represent the event, including its name, date, location, and a brief description."
    },
    {
        title: "Wait for Onchain Event to be created",
        description: "Your contract and referral url will be ready for others to use"
    }
]