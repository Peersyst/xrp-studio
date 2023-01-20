import { useResetRecoilState } from "recoil";
import collectionCreationState from "module/collection/state/CollectionCreationState";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const CollectionCreationRoutes = (): JSX.Element => {
    const resetCollectionCreationState = useResetRecoilState(collectionCreationState);

    useEffect(() => {
        return () => {
            resetCollectionCreationState();
        };
    }, []);

    return <Outlet />;
};

export default CollectionCreationRoutes;
