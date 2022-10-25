import { BaseNftPageContentProps } from "module/nft/component/layout/BaseNftPage/BaseNftPage.types";
import PageContent from "module/common/component/layout/PageContent/PageContent";
import useTranslate from "module/common/hook/useTranslate";
import Collapsable from "module/common/component/util/Collapsable/Collapsable";
import NftPreviewCarousel from "module/nft/component/display/NftPreviewCarousel/NftPreviewCarousel";
import BaseNftPageForm from "module/nft/component/layout/BaseNftPage/BaseNftPageForm";

const BaseNftPageContent = ({
    nft,
    collections,
    readonly,
    collectionNfts,
    fixedCollection,
    loadingNft = false,
    loadingCollectionNfts = false,
    collectionNftLink,
}: BaseNftPageContentProps): JSX.Element => {
    const translate = useTranslate();

    const nftId = nft?.id;

    return (
        <PageContent>
            <BaseNftPageForm
                nft={nft}
                collections={collections}
                readonly={readonly}
                fixedCollection={fixedCollection}
                loading={loadingNft}
            />
            {collectionNfts && (
                <Collapsable label={translate("hideCollection")} collapsedLabel={translate("showCollection")}>
                    <NftPreviewCarousel loading={loadingCollectionNfts} nfts={collectionNfts} activeId={nftId} to={collectionNftLink} />
                </Collapsable>
            )}
        </PageContent>
    );
};

export default BaseNftPageContent;
