import { devNftMetadata } from "./nftMetadata";

export const devNftMetadataAttributes = [
    {
        nftMetadataId: 1,
        metadata: devNftMetadata[0],
        traitType: "gender",
        value: "male",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nftMetadataId: 1,
        metadata: devNftMetadata[0],
        traitType: "BTC Maximalist",
        value: "yes",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nftMetadataId: 1,
        metadata: devNftMetadata[0],
        traitType: "mood",
        value: "happy",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nftMetadataId: 9,
        metadata: devNftMetadata[8],
        traitType: "gender",
        value: "female",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nftMetadataId: 9,
        metadata: devNftMetadata[8],
        traitType: "BTC Maximalist",
        value: "yes",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nftMetadataId: 5,
        metadata: devNftMetadata[4],
        traitType: "mood",
        value: "tired",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nftMetadataId: 5,
        metadata: devNftMetadata[4],
        traitType: "BTC Maximalist",
        value: "no",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nftMetadataId: 5,
        metadata: devNftMetadata[4],
        traitType: "gender",
        value: "male",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export default function getByEnv(env: string) {
    if (env === "development") {
        return devNftMetadataAttributes;
    }
    if (env === "preview") {
        const result = [];
        for (let i = 0; i < 100; i++) {
            result.push({
                nftMetadataId: i + 1,
                traitType: "attribute " + i,
                value: "value " + i,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        return result;
    }
    if (env === "test") {
        return devNftMetadataAttributes;
    }
    return [];
}
