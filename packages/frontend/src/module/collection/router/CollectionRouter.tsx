import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import LoggedInRoute from "module/wallet/component/navigation/LoggedInRoute/LoggedInRoute";
import CreateCollectionRoutes from "module/collection/router/CreateCollectionRoutes";
import EditCollectionRoutes from "module/collection/router/EditCollectionRoutes";

export enum CollectionRoutes {
    VIEW_COLLECTION = "/collections/:path",
    MY_COLLECTIONS = "/collections/my-collections",
    CREATE_COLLECTION = "/collections/create",
    CREATE_COLLECTION_EDIT_NFT = "/collections/create/nft/:draftId",
    EDIT_COLLECTION = "/collections/edit/:path",
    EDIT_COLLECTION_EDIT_NFT = "/collections/edit/:path/nft/:draftId",
}

const CollectionPage = lazy(() => import("../page/CollectionPage"));
const MyCollectionsPage = lazy(() => import("../page/MyCollectionsPage"));
const CreateCollectionPage = lazy(() => import("../page/CreateCollectionPage/CreateCollectionPage"));
const CreateCollectionNftDraftPage = lazy(() => import("../page/CreateCollectionNftDraftPage/CreateCollectionNftDraftPage"));
const EditCollectionPage = lazy(() => import("../page/EditCollectionPage/EditCollectionPage"));
const EditCollectionNftDraftPage = lazy(() => import("../page/EditCollectionNftDraftPage/EditCollectionNftDraftPage"));

export const useCollectionRoutes = (): RouteObject[] => {
    return [
        {
            path: CollectionRoutes.CREATE_COLLECTION,
            element: (
                <LoggedInRoute>
                    <CreateCollectionRoutes />
                </LoggedInRoute>
            ),
            children: [
                {
                    path: CollectionRoutes.CREATE_COLLECTION,
                    element: <CreateCollectionPage />,
                },
                {
                    path: CollectionRoutes.CREATE_COLLECTION_EDIT_NFT,
                    element: <CreateCollectionNftDraftPage />,
                },
            ],
        },
        {
            path: CollectionRoutes.EDIT_COLLECTION,
            element: (
                <LoggedInRoute>
                    <EditCollectionRoutes />
                </LoggedInRoute>
            ),
            children: [
                {
                    path: CollectionRoutes.EDIT_COLLECTION,
                    element: <EditCollectionPage />,
                },
                {
                    path: CollectionRoutes.EDIT_COLLECTION_EDIT_NFT,
                    element: <EditCollectionNftDraftPage />,
                },
            ],
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
