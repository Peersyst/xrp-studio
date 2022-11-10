import { RouteObject } from "react-router-dom";
import { lazy } from "react";

export enum CollectionRoutes {
    VIEW_COLLECTION = "/collections/:id",
    MY_COLLECTIONS = "/collections/my-collections",
    CREATE_COLLECTION = "/collections/creation",
    EDIT_NFT_CREATE_COLLECTION = "/collections/creation/nft/:index",
}

const CollectionPage = lazy(() => import("./page/CollectionPage"));
const CollectionCreationPage = lazy(() => import("./page/CollectionCreationPage/CollectionCreationPage"));
const EditCollectionNftDraftPage = lazy(() => import("./page/EditCollectionNftDraftPage/EditCollectionNftDraftPage"));
const CollectionsPage = lazy(() => import("./page/MyCollectionsPage"));

export const useCollectionRoutes = (): RouteObject[] => {
    return [
        { path: CollectionRoutes.CREATE_COLLECTION, element: <CollectionCreationPage /> },
        {
            path: CollectionRoutes.EDIT_NFT_CREATE_COLLECTION,
            element: <EditCollectionNftDraftPage />,
        },
        {
            path: CollectionRoutes.MY_COLLECTIONS,
            children: [
                {
                    path: CollectionRoutes.MY_COLLECTIONS,
                    element: <CollectionsPage />,
                },
            ],
        },
        {
            path: CollectionRoutes.VIEW_COLLECTION,
            element: <CollectionPage />,
        },
    ];
};
