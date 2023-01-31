import { useResetRecoilState } from "recoil";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import editCollectionState from "module/collection/page/EditCollectionPage/state/EditCollectionState";

const CollectionCreationRoutes = (): JSX.Element => {
    const resetEditCollectionState = useResetRecoilState(editCollectionState);

    useEffect(() => {
        return () => {
            resetEditCollectionState();
        };
    }, []);

    return <Outlet />;
};

export default CollectionCreationRoutes;
