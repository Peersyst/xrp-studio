import { RouteObject } from "react-router-dom";
import { lazy } from "react";

export enum NftRoutes {
    MY_NFTS = "/nfts/my-nfts",
    NFT_CREATION = "/nfts/creation",
    VIEW_NFT = "/nfts/:id",
}

const MyNftsPage = lazy(() => import("./page/MyNftsPage"));
const NftCreationPage = lazy(() => import("./page/NftCreationPage/NftCreationPage"));
const ViewNftPage = lazy(() => import("./page/ViewNftPage/ViewNftPage"));

export const useNftRoutes = (): RouteObject[] => {
    return [
        {
            path: NftRoutes.MY_NFTS,
            element: <MyNftsPage />,
        },
        {
            path: NftRoutes.NFT_CREATION,
            element: <NftCreationPage />,
        },
        {
            path: NftRoutes.VIEW_NFT,
            element: <ViewNftPage />,
        },
    ];
};
