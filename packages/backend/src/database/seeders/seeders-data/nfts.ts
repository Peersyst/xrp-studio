import { NftStatus } from "../../entities/Nft";
import { devUsers } from "./users";
import { devCollections } from "./collections";

export const devNfts = [
    {
        id: 1,
        issuer: devUsers[0].address,
        transferFee: 10,
        flags: 8,
        status: NftStatus.DRAFT,
        account: devUsers[0].address,
        collectionId: devCollections[0].id,
        uri: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf4dfuylqabf3oclgtqy55fbzdi",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        tokenId: "000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D15",
        mintTransactionHash: "BB1930B44E273014C7CCE4A450E90E666C2B71A55740884E1B9F6048FBB669F2",
        issuer: devUsers[0].address,
        flags: 2,
        status: NftStatus.CONFIRMED,
        account: devUsers[0].address,
        uri: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf4dfuylqabf3oclgtqy55fbzdi",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        issuer: devUsers[0].address,
        transferFee: 10,
        flags: 8,
        status: NftStatus.DRAFT,
        account: devUsers[0].address,
        collectionId: devCollections[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 4,
        tokenId: "000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D68",
        mintTransactionHash: "BB1930B44E273014C7CCE4A450E90E666C2B71A55740884E1B9F6048FBB669F4",
        issuer: devUsers[2].address,
        transferFee: 10,
        flags: 1,
        status: NftStatus.CONFIRMED,
        account: devUsers[2].address,
        collectionId: devCollections[1].id,
        uri: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf4dfuylqabf3oclgtqy55fbzdi",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 5,
        tokenId: "000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D67",
        mintTransactionHash: "BB1930B44E273014C7CCE4A450E90E666C2B71A55740884E1B9F6048FBB669F5",
        issuer: devUsers[2].address,
        transferFee: 10,
        flags: 0,
        status: NftStatus.FAILED,
        account: devUsers[2].address,
        collectionId: devCollections[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 6,
        tokenId: "000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D66",
        mintTransactionHash: "BB1930B44E273014C7CCE4A450E90E666C2B71A55740884E1B9F6048FBB669F6",
        issuer: devUsers[2].address,
        transferFee: 50,
        flags: 0,
        status: NftStatus.DRAFT,
        account: devUsers[2].address,
        collectionId: devCollections[1].id,
        uri: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf4dfuylqabf3oclgtqy55fbzdi",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 7,
        tokenId: "000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D65",
        mintTransactionHash: "BB1930B44E273014C7CCE4A450E90E666C2B71A55740884E1B9F6048FBB669F7",
        issuer: devUsers[2].address,
        transferFee: 10,
        flags: 4,
        status: NftStatus.DRAFT,
        account: devUsers[0].address,
        collectionId: devCollections[2].id,
        uri: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf4dfuylqabf3oclgtqy55fbzdi",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 8,
        tokenId: "000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D64",
        mintTransactionHash: "BB1930B44E273014C7CCE4A450E90E666C2B71A55740884E1B9F6048FBB669F8",
        issuer: devUsers[2].address,
        transferFee: 10,
        flags: 1,
        status: NftStatus.DRAFT,
        account: devUsers[0].address,
        collectionId: devCollections[2].id,
        uri: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf4dfuylqabf3oclgtqy55fbzdi",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 9,
        tokenId: "000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D63",
        mintTransactionHash: "BB1930B44E273014C7CCE4A450E90E666C2B71A55740884E1B9F6048FBB669F9",
        issuer: devUsers[0].address,
        flags: 0,
        status: NftStatus.CONFIRMED,
        account: devUsers[0].address,
        uri: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf4dfuylqabf3oclgtqy55fbzdi",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 10,
        tokenId: "000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D62",
        mintTransactionHash: "BB1930B44E273014C7CCE4A450E90E666C2B71A55740884E1B9F6048FBB669F0",
        issuer: devUsers[0].address,
        transferFee: 10,
        flags: 0,
        status: NftStatus.CONFIRMED,
        account: devUsers[0].address,
        uri: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf4dfuylqabf3oclgtqy55fbzdi",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 11,
        tokenId: "000B013A95F14B0044F78A264E41713C64B5F89242540EE208C3098E00000D61",
        mintTransactionHash: "BB1930B44E273014C7CCE4A450E90E666C2B71A55740884E1B9F6048FBB66918",
        issuer: devUsers[0].address,
        transferFee: 10,
        flags: 2,
        status: NftStatus.CONFIRMED,
        account: devUsers[0].address,
        uri: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf4dfuylqabf3oclgtqy55fbzdi",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export default function getByEnv(env: string) {
    if (env === "development") {
        return devNfts;
    }
    if (env === "preview") {
        const result = [];
        for (let i = 0; i < 100; i++) {
            result.push({
                id: i + 1,
                issuer: devUsers[0].address,
                transferFee: 10,
                flags: 8,
                status: NftStatus.DRAFT,
                account: devUsers[0].address,
                collectionId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        return result;
    }
    if (env === "test") {
        return devNfts;
    }
    return [];
}
