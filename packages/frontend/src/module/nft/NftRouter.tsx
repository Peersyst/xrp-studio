import { RouteObject } from "react-router-dom";
import MyNftsPage from "./pages/MyNftsPage";

export enum NftRoutes {
    NFTS = "/nfts/",
    MY_NFTS = "nfts/my-nfts",
    CREATE_NFT = "/nfts/creation",
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
