import { useParams } from "react-router-dom";
import DropLanding from "module/drop/component/display/DropLanding/DropLanding";
import NotFoundPage from "module/common/page/NotFoundPage/NotFoundPage";
import useGetDropByPath from "module/drop/query/useGetDropByPath";
import { useGetDropNfts } from "module/nft/query/useGetDropNfts";

const DropLandingPage = (): JSX.Element => {
    const { path } = useParams<string>();
    const { data: drop, isLoading: dropLoading } = useGetDropByPath(path);

    const { data: nfts, isLoading: loadingNfts } = useGetDropNfts(drop?.id);

    if (!dropLoading && !drop) return <NotFoundPage />;

    return <DropLanding drop={drop} nfts={nfts} loadingNfts={loadingNfts} loading={dropLoading} />;
};

export default DropLandingPage;
