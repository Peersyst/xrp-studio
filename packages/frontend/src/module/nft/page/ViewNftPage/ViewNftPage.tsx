import BaseNftPage from "module/nft/component/layout/BaseNftPage/BaseNftPage";
import { useParams } from "react-router-dom";
import useGetNft from "module/nft/query/useGetNft";
import MainPageHeader from "module/common/component/layout/MainPageHeader/MainPageHeader";
import useViewNftPageSlots from "module/nft/page/ViewNftPage/hook/useViewNftPageSlots";
import useGetNfts from "module/nft/query/useGetNfts";
import { usePaginatedList } from "@peersyst/react-hooks";
import { NftRoutes } from "module/nft/NftRouter";
import useTranslate from "module/common/hook/useTranslate";
import { SocialShareOptions } from "module/common/component/input/ShareButton/ShareButton.types";
import ShareButton from "module/common/component/input/ShareButton/ShareButton";

const ViewNftPage = (): JSX.Element => {
    const translate = useTranslate();
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

    const shareData: ShareData = {
        title: "XRP Studio",
        text: translate("checkoutNft"),
        url: window.location.origin + NftRoutes.VIEW_NFT.replace(":id", nft?.id ? String(nft.id) : ""),
    };

    return (
        <BaseNftPage
            collectionNfts={collectionNfts}
            loadingCollectionNfts={loadingNft || loadingCollectionNfts}
            activeCarouselNftId={id}
            collectionNftLink={(collectionNft) => NftRoutes.VIEW_NFT.replace(":id", collectionNft.id.toString())}
        >
            {{
                header: (
                    <MainPageHeader
                        back
                        backIconSize="md"
                        complement={<ShareButton shareData={shareData} networks={[SocialShareOptions.TWITTER]} />}
                    />
                ),
                content: slots,
            }}
        </BaseNftPage>
    );
};

export default ViewNftPage;
