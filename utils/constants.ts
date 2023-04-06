export const chains: any = {

    // 137: {
    //   name: "Matic Mainnet",
    //   url: "https://polygonscan.com/",
    //   id: 137,
    // },
    534353:
    {
        // https://guide.scroll.io/user-guide/setup
        name: 'Scroll Alpha Testnet',
        rpcUrl: 'https://alpha-rpc.scroll.io/l2',
        symbol: 'ETH',
        url: "https://blockscout.scroll.io/",
        id: 534353
    },
    // https://gnosisfaucet.com/
    10200: {
        name: 'Gnosis (Chaido)',
        symbol: 'XDAI',
        rpcUrl: 'https://rpc.chiadochain.net',
        url: 'https://blockscout.com/gnosis/chiado/',
        id: 10200
    },
    80001: {
        name: "Mumbai Testnet",
        url: "https://mumbai.polygonscan.com/",
        id: 80001,
    },
};

export const dafaultChainId: any = 534353;

export function capitalize(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const toHexString = (number: any) => {
    return "0x" + Number(number).toString(16);
}