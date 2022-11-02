import { RouteObject } from "react-router-dom";
import EditNftCreationPage from "module/collection/pages/EditNftCreationPage";

export enum CollectionRoutes {
    COLLECTIONS = "/collections/",
    CREATE_COLLECTION = "/collections/creation",
    EDIT_NFT_CREATE_COLLECTION = "/collections/creation/:id",
}

export const useCollectionRoutes = (): RouteObject[] => {
    return [
        {
            path: CollectionRoutes.EDIT_NFT_CREATE_COLLECTION,
            element: <EditNftCreationPage />,
        },
    ];
};
