import { RouteObject } from "react-router-dom";
import MyNftsPage from "./pages/MyNftsPage/MyNftsPage";

export enum NftRoutes {
    NFTS = "/nfts/",
    COLLECTIONS = "/collections/",
    MY_NFTS = "/my-nfts",
    CREAT_NFT = "/create-nft",
    CREATE_COLLECTION = "/create-collection",
}

export const useNftRoutes = (): RouteObject[] => {
    return [
        {
            path: NftRoutes.MY_NFTS,
            children: [
                {
                    path: NftRoutes.MY_NFTS,
                    element: <MyNftsPage />,
                },
            ],
        },
    ];
};
