import { RouteObject } from "react-router-dom";
import MyNftsPage from "./pages/MyNftsPage";
import NftCreationPage from "module/nft/pages/NftCreationPage/NftCreationPage";
import ViewNftPage from "module/nft/pages/ViewNftPage/ViewNftPage";

export enum NftRoutes {
    NFTS = "/nfts/",
    MY_NFTS = "/nfts/my-nfts",
    NFT_CREATION = "/nfts/creation",
    VIEW_NFT = "/nfts/:id",
}

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
