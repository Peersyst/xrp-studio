import { RouteObject } from "react-router-dom";
import { lazy } from "react";

export enum CollectionRoutes {
    VIEW_COLLECTION = "/collections/:id",
    CREATE_COLLECTION = "/collections/creation",
    EDIT_NFT_CREATE_COLLECTION = "/collections/creation/:id",
}

const CollectionCreationPage = lazy(() => import("./page/CollectionCreationPage/CollectionCreationPage"));
const EditNftCreationPage = lazy(() => import("./page/EditNftCreationPage"));

export const useCollectionRoutes = (): RouteObject[] => {
    return [
        { path: CollectionRoutes.CREATE_COLLECTION, element: <CollectionCreationPage /> },
        {
            path: CollectionRoutes.EDIT_NFT_CREATE_COLLECTION,
            element: <EditNftCreationPage />,
        },
    ];
};
