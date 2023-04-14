import { ethers } from 'ethers';
import ABI from '../../../abi/OnchainEvents.json';
import { getMaxPriorityFeePerGas } from './getFee';

const gasLimit = (process.env.NEXT_PUBLIC_GAS_LIMIT || 2864222) as Number;
const OnchainEvents = (process.env.NEXT_PUBLIC_BUY_ASSETS_ADDRESS || '0xC90F6c85cC66aa46077F24a6B6CE05d72045c40E') as string;

export const AttendOnchainEvent = async (
    provider: any,
    signer: any,
    leaf: any
) => {
    try {
        console.log('AttendOnchainEvent: ', leaf);
        const maxPriorityFeePerGas = await getMaxPriorityFeePerGas(provider);
        console.log('maxPriorityFeePerGas: ', maxPriorityFeePerGas);
        const args: any = []
        args.push({
            gasLimit,
            maxPriorityFeePerGas: maxPriorityFeePerGas?.toString()
        });

        const contract = new ethers.Contract(OnchainEvents, ABI, signer);
        const tx = await contract.attendEvent(leaf, ...args);
        const receipt = await tx.wait();
        console.log(receipt);

    } catch (error) {
        console.log(error);
    }
};
