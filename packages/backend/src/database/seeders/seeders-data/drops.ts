import { devUsers } from "./users";

export const devDrops = [
    {
        id: 3,
        collectionId: 3,
        price: "10000000",
        items: 3,
        soldItems: 0,
        backgroundColor: "#000000",
        fontColor: "#FFFFFF",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        instagram: "instagram",
        twitter: "twitter",
        discord: "discord",
    },
    {
        id: 2,
        collectionId: 2,
        price: "20000000",
        items: 3,
        soldItems: 0,
        backgroundColor: "#000000",
        fontColor: "#FFFFFF",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        instagram: "instagram",
        twitter: "twitter",
        discord: "discord",
    },
    {
        id: 1,
        collectionId: 1,
        price: "30000000",
        items: 2,
        soldItems: 0,
        backgroundColor: "#000000",
        fontColor: "#FFFFFF",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        instagram: "instagram",
        twitter: "twitter",
        discord: "discord",
    },
];

export default function getByEnv(env: string) {
    if (env === "development") {
        return devDrops;
    }
    if (env === "preview") {
        return [
            {
                id: 1,
                taxon: "10",
                name: "CryptoPunks",
                description:
                    "CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.",
                image: "https://lh3.googleusercontent.com/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE=s168",
                header: "https://lh3.googleusercontent.com/48oVuDyfe_xhs24BC2TTVcaYCX7rrU5mpuQLyTgRDbKHj2PtzKZsQ5qC3xTH4ar34wwAXxEKH8uUDPAGffbg7boeGYqX6op5vBDcbA=h600",
                account: devUsers[0].address,
                items: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
    }
    if (env === "test") {
        return devDrops;
    }
    return [];
}
