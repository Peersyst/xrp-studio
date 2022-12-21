import BaseNftPage from "module/nft/component/layout/BaseNftPage/BaseNftPage";
import { useParams } from "react-router-dom";
import useGetNft from "module/nft/query/useGetNft";
import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import useViewNftPageSlots from "module/nft/page/ViewNftPage/hook/useViewNftPageSlots";
import useGetNfts from "module/nft/query/useGetNfts";
import { usePaginatedList } from "@peersyst/react-hooks";
import { NftRoutes } from "module/nft/NftRouter";

const ViewNftPage = (): JSX.Element => {
    const params = useParams();

    const id = Number(params.id);
    const { data: nft, isLoading: loadingNft } = useGetNft(id);
    const hasCollection = !!nft?.collection;
    const { data: collectionNftsData, isLoading: loadingCollectionNfts } = useGetNfts(
        { collections: [nft?.collection?.id || 0] },
        { enabled: hasCollection },
    );
    const collectionNfts = usePaginatedList(collectionNftsData?.pages, (page) => page.items);

    const slots = useViewNftPageSlots({ nft, loading: loadingNft });

    return (
        <BaseNftPage
            collectionNfts={collectionNfts}
            loadingCollectionNfts={loadingNft || loadingCollectionNfts}
            activeCarouselNftId={id}
            collectionNftLink={(collectionNft) => NftRoutes.VIEW_NFT.replace(":id", collectionNft.id.toString())}
        >
            {{ header: <MainPageHeader back backIconSize="md" />, content: slots }}
        </BaseNftPage>
    );
};

export default ViewNftPage;
