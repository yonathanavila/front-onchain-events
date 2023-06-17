import { MerkleTree } from 'merkletreejs';
import { EventIdentifier } from '../getEventIdentifier';
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { GetCurrentBlockNumber } from '../currentBlockNumber';

export default async function GenerateMerkleTree(
    {
        event_name,
        event_date_start,
        event_date_end,
        event_location,
        event_organizer,
        event_address,
        event_organizer_email,
        event_fee,
        event_description
    }: EventInformationType
): Promise<MerkleTreeResponseType> {
    try {
        // get current block number to generate an identifier
        const blockNumber: any = await GetCurrentBlockNumber();

        const leaves = [
            EventIdentifier(event_address, blockNumber),
            event_name,
            event_date_start,
            event_date_end,
            event_location,
            event_organizer,
            event_address,
            event_organizer_email,
            String(event_fee),
            event_description
        ].map((leaf) => {
            const bytes = utf8ToBytes(leaf);
            const hash = keccak256(bytes);
            return hash;
        });

        // generate Merkle tree
        const tree: any = new MerkleTree(leaves, keccak256, { sort: true });

        // root of the tree
        const root = tree.getRoot().toString('hex');

        // return each leaf in hex format
        const leaves_ = tree.leaves.map((leaf: any) => `0x${leaf.toString('hex')}`);

        // delete last position of tree    
        const proof = leaves_.shift();

        // took the identifier leaf to send the contract
        const leaf = leaves_[0];

        return ({
            proof,
            leaf,
            root
        });
    } catch (error: any) {
        throw new Error('Event registration failed');
    }
}
