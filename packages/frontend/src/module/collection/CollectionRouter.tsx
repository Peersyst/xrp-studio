import { RouteObject } from "react-router-dom";
import CollectionsPage from "module/collection/pages/MyCollectionsPage";

export enum CollectionRoutes {
    COLLECTIONS = "/collections/",
    MY_COLLECTIONS = "/collections/my-collections",
    CREATE_COLLECTION = "/collections/creation",
}

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
    ];
};
