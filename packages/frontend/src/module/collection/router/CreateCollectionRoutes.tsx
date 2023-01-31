import { useResetRecoilState } from "recoil";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import createCollectionState from "module/collection/page/CreateCollectionPage/state/CreateCollectionState";

const CollectionCreationRoutes = (): JSX.Element => {
    const resetCreateCollectionState = useResetRecoilState(createCollectionState);

    useEffect(() => {
        return () => {
            resetCreateCollectionState();
        };
    }, []);

    return <Outlet />;
};

export default CollectionCreationRoutes;
