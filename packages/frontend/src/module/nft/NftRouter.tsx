import { RouteObject } from "react-router-dom";

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
                    element: <>MyNftsPage</>,
                },
            ],
        },
    ];
};
