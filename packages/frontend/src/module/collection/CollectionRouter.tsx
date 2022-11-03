import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import CollectionsPage from "module/collection/pages/MyCollectionsPage";

export enum CollectionRoutes {
    COLLECTIONS = "/collections/",
    MY_COLLECTIONS = "/collections/my-collections",
    CREATE_COLLECTION = "/collections/creation",
    COLLECTION = "/collection/:id",
}

const CollectionPage = lazy(() => import("./page/CollectionPage"));

export const useCollectionRoutes = (): RouteObject[] => {
    return [
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
            path: CollectionRoutes.COLLECTION,
            element: <CollectionPage />,
        },
    ];
};
