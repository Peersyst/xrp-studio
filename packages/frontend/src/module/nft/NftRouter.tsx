import { RouteObject } from "react-router-dom";
import MyNftsPage from "./pages/MyNftsPage/MyNftsPage";

export enum NftRoutes {
    NFTS = "/nfts/",
    MY_NFTS = "/my-nfts",
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
