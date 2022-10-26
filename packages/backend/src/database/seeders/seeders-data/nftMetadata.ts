import { devNfts } from "./nfts";

export const devNftMetadata = [
    {
        nft: devNfts[0],
        name: "1512",
        description: "description",
        image: "https://img.seadn.io/files/9b80d990002acbc95453c611601752e8.png?auto=format&fit=max&w=384",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nft: devNfts[1],
        name: "7925",
        image: "https://img.seadn.io/files/07e5cfcfeabc324b17b35a1a89f5d32a.png?auto=format&fit=max&w=384",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nft: devNfts[2],
        name: "3045",
        image: "https://img.seadn.io/files/8e0d54940097c33e857e554dabbd6be4.png?auto=format&fit=max&w=384",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nft: devNfts[3],
        name: "5938",
        description: "description",
        image: "https://img.seadn.io/files/c22690a62923682034bea405c5cd3082.png?auto=format&fit=max&w=384",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nft: devNfts[4],
        name: "471",
        image: "https://img.seadn.io/files/7295681cd544cb879fc267cb39e75942.png?auto=format&fit=max&w=384",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nft: devNfts[5],
        name: "3445",
        description: "description",
        image: "https://img.seadn.io/files/62543847872d910fd0849e8f712621c4.png?auto=format&fit=max&w=384",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nft: devNfts[6],
        name: "4107",
        image: "https://opensea.io/assets/ethereum/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/4107",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nft: devNfts[7],
        name: "5997",
        description: "description",
        image: "https://img.seadn.io/files/9c1b5dc3c42107d4a3e403ef12f67622.png?auto=format&fit=max&w=384",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nft: devNfts[8],
        name: "7742",
        image: "https://img.seadn.io/files/639c9b78fc8a5eb7411b3cdb2b39e33a.png?auto=format&fit=max&w=384",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nft: devNfts[9],
        name: "1",
        description: "description",
        image: "https://pbs.twimg.com/media/FGYohUkXoAQAT1_.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nft: devNfts[10],
        name: "2",
        description: "description",
        image: "https://pbs.twimg.com/media/FHZrlICXoAcLRRd?format=jpg&name=360x360",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export default function getByEnv(env: string) {
    if (env === "development" || env === "preview") {
        return devNftMetadata;
    }
    if (env === "test") {
        return devNftMetadata;
    }
    return [];
}
