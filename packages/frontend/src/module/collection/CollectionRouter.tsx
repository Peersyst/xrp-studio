import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import LoggedInRoute from "module/wallet/component/navigation/LoggedInRoute/LoggedInRoute";

export enum CollectionRoutes {
    VIEW_COLLECTION = "/collections/:id",
    MY_COLLECTIONS = "/collections/my-collections",
    CREATE_COLLECTION = "/collections/creation",
    EDIT_NFT_CREATE_COLLECTION = "/collections/creation/nft/:index",
}

const CollectionPage = lazy(() => import("./page/CollectionPage"));
const CollectionCreationPage = lazy(() => import("./page/CollectionCreationPage/CollectionCreationPage"));
const EditCollectionNftDraftPage = lazy(() => import("./page/EditCollectionNftDraftPage/EditCollectionNftDraftPage"));
const MyCollectionsPage = lazy(() => import("./page/MyCollectionsPage"));

export const useCollectionRoutes = (): RouteObject[] => {
    return [
        {
            path: CollectionRoutes.CREATE_COLLECTION,
            element: (
                <LoggedInRoute>
                    <CollectionCreationPage />
                </LoggedInRoute>
            ),
        },
        {
            path: CollectionRoutes.EDIT_NFT_CREATE_COLLECTION,
            element: (
                <LoggedInRoute>
                    <EditCollectionNftDraftPage />
                </LoggedInRoute>
            ),
        },
        {
            path: CollectionRoutes.MY_COLLECTIONS,
            children: [
                {
                    path: CollectionRoutes.MY_COLLECTIONS,
                    element: (
                        <LoggedInRoute>
                            <MyCollectionsPage />
                        </LoggedInRoute>
                    ),
                },
            ],
        },
        {
            path: CollectionRoutes.VIEW_COLLECTION,
            element: <CollectionPage />,
        },
    ];
};
