import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DashboardRoutes } from "module/dashboard/DashboardRouter";
import useGetDrop from "module/drop/query/useGetDrop";
import DropLanding from "module/drop/component/display/DropLanding/DropLanding";
import { useGetCollectionNfts } from "module/nft/query/useGetCollectionNfts";
import { usePaginatedList } from "@peersyst/react-hooks";

const DropLandingPage = (): JSX.Element => {
    const { id } = useParams<string>();
    const dropId = Number(id);
    const navigate = useNavigate();
    const { data: drop, isLoading: dropLoading } = useGetDrop(dropId);

    const { data: paginatedNfts, isLoading: loadingNfts } = useGetCollectionNfts(drop?.collection?.id);
    const nfts = usePaginatedList(paginatedNfts?.pages, (page) => page.items);

    useEffect(() => {
        if (dropId !== undefined && (Number.isNaN(dropId) || dropId < 1)) navigate(DashboardRoutes.MAIN);
        else if (dropId && !dropLoading && !drop) {
            navigate(DashboardRoutes.MAIN);
        }
    }, [dropId, drop, dropLoading]);

    return <DropLanding drop={drop} nfts={nfts} loadingNfts={loadingNfts} />;
};

export default DropLandingPage;
