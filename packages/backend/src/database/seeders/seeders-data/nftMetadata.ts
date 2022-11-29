import { devNfts } from "./nfts";

export const devNftMetadata = [
    {
        nftId: devNfts[0].id,
        name: "1512",
        description: "description",
        image: "https://img.seadn.io/files/9b80d990002acbc95453c611601752e8.png?auto=format&fit=max&w=384",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nftId: devNfts[2].id,
        name: "3045",
        image: "https://img.seadn.io/files/8e0d54940097c33e857e554dabbd6be4.png?auto=format&fit=max&w=384",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nftId: devNfts[3].id,
        name: "5938",
        description: "description",
        image: "https://img.seadn.io/files/c22690a62923682034bea405c5cd3082.png?auto=format&fit=max&w=384",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nftId: devNfts[4].id,
        name: "471",
        image: "https://img.seadn.io/files/7295681cd544cb879fc267cb39e75942.png?auto=format&fit=max&w=384",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nftId: devNfts[5].id,
        name: "3445",
        description: "description",
        image: "https://img.seadn.io/files/62543847872d910fd0849e8f712621c4.png?auto=format&fit=max&w=384",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nftId: devNfts[6].id,
        name: "4107",
        image: "https://opensea.io/assets/ethereum/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/4107",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nftId: devNfts[7].id,
        name: "5997",
        description: "description",
        image: "https://img.seadn.io/files/9c1b5dc3c42107d4a3e403ef12f67622.png?auto=format&fit=max&w=384",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nftId: devNfts[8].id,
        name: "7742",
        image: "https://img.seadn.io/files/639c9b78fc8a5eb7411b3cdb2b39e33a.png?auto=format&fit=max&w=384",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nftId: devNfts[9].id,
        name: "1",
        description: "description",
        image: "https://pbs.twimg.com/media/FGYohUkXoAQAT1_.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        nftId: devNfts[10].id,
        name: "2",
        description: "description",
        image: "https://pbs.twimg.com/media/FHZrlICXoAcLRRd?format=jpg&name=360x360",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export default function getByEnv(env: string) {
    if (env === "development") {
        return devNftMetadata;
    }
    if (env === "preview") {
        const result = [];
        for (let i = 0; i < 100; i++) {
            result.push({
                nftId: i + 1,
                name: "Drop #" + i,
                image: "https://opensea.io/assets/ethereum/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/4107",
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        return result;
    }
    if (env === "test") {
        return devNftMetadata;
    }
    return [];
}
