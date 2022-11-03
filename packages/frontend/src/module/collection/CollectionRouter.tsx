import { RouteObject } from "react-router-dom";
import { lazy } from "react";

export enum CollectionRoutes {
    COLLECTIONS = "/collections",
    CREATE_COLLECTION = "/collections/creation",
    COLLECTION = "/collection/:id",
}

const CollectionPage = lazy(() => import("./page/CollectionPage"));

export const useCollectionRoutes = (): RouteObject[] => {
    return [
        {
            path: CollectionRoutes.COLLECTION,
            element: <CollectionPage />,
        },
    ];
};
