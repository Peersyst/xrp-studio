import { useParams } from "react-router-dom";
import DropLanding from "module/drop/component/display/DropLanding/DropLanding";
import { useGetCollectionNfts } from "module/nft/query/useGetCollectionNfts";
import { usePaginatedList } from "@peersyst/react-hooks";
import NotFoundPage from "module/common/page/NotFoundPage/NotFoundPage";
import useGetDropByPath from "module/drop/query/useGetDropByPath";

const DropLandingPage = (): JSX.Element => {
    const { path } = useParams<string>();
    const { data: drop, isLoading: dropLoading } = useGetDropByPath(path);

    const { data: paginatedNfts, isLoading: loadingNfts } = useGetCollectionNfts(drop?.collection?.id);
    const nfts = usePaginatedList(paginatedNfts?.pages, (page) => page.items);

    if (!dropLoading && !drop) return <NotFoundPage />;

    return <DropLanding drop={drop} nfts={nfts} loadingNfts={loadingNfts} loading={dropLoading} />;
};

export default DropLandingPage;
