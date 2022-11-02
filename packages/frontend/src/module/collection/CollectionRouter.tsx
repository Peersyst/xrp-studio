import { RouteObject } from "react-router-dom";
import EditCollectionNftDraftPage from "module/collection/pages/EditNftCreationPage/EditCollectionNftDraftPage";

export enum CollectionRoutes {
    COLLECTIONS = "/collections/",
    CREATE_COLLECTION = "/collections/creation",
    EDIT_NFT_CREATE_COLLECTION = "/collections/creation/:index",
}

export const useCollectionRoutes = (): RouteObject[] => {
    return [
        {
            path: CollectionRoutes.EDIT_NFT_CREATE_COLLECTION,
            element: <EditCollectionNftDraftPage />,
        },
    ];
};
