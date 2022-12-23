import { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import collectionCreationState from "module/collection/state/CollectionCreationState";
import { CollectionRoutes, EDIT_NFT_CREATE_COLLECTION_PATH } from "module/collection/CollectionRouter";

export default function (): void {
    let previousRoute: string | undefined;

    const resetCollectionCreationState = useResetRecoilState(collectionCreationState);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const currentRoute = document.location.pathname;
            if (
                currentRoute !== previousRoute &&
                !(currentRoute.includes(EDIT_NFT_CREATE_COLLECTION_PATH) && previousRoute?.includes(EDIT_NFT_CREATE_COLLECTION_PATH)) &&
                ((!currentRoute.includes(EDIT_NFT_CREATE_COLLECTION_PATH) && previousRoute === CollectionRoutes.CREATE_COLLECTION) ||
                    (currentRoute !== CollectionRoutes.CREATE_COLLECTION && previousRoute?.includes(EDIT_NFT_CREATE_COLLECTION_PATH)))
            ) {
                resetCollectionCreationState();
            }
            previousRoute = document.location.pathname;
        });
        observer.observe(document, { subtree: true, childList: true });
        return () => {
            observer.disconnect();
        };
    }, []);
}
