import PageContent from "module/common/component/layout/PageContent/PageContent";
import useTranslate from "module/common/hook/useTranslate";
import Collapsable from "module/common/component/util/Collapsable/Collapsable";
import NftPreviewCarousel from "module/nft/component/display/NftPreviewCarousel/NftPreviewCarousel";
import { Col, Row } from "@peersyst/react-components";
import { BaseNftPageContentProps } from "module/nft/component/layout/BaseNftPage/BaseNftPageContent/BaseNftPageContent.types";
import { rack } from "@peersyst/react-utils";
import {
    BaseNftPageContentLeftSlot,
    BaseNftPageContentRightSlot,
} from "module/nft/component/layout/BaseNftPage/BaseNftPageContent/BaseNftPageContentSlots";

const BaseNftPageContent = rack(
    (
        { activeCarouselNftId, collectionNfts, loadingCollectionNfts = false, collectionNftLink }: BaseNftPageContentProps,
        slots,
    ): JSX.Element => {
        const translate = useTranslate();

        const hasNfts = !!collectionNfts?.length;

        return (
            <PageContent css={{ paddingBottom: hasNfts ? 0 : undefined }}>
                <Col flex={1} gap="1.5rem">
                    <Row
                        gap="1.5rem"
                        flex={1}
                        breakpoint={{ width: "nftPage", alignItems: "stretch", gap: "1.5rem" }}
                        css={{ paddingBottom: hasNfts ? "1rem" : undefined }}
                    >
                        <Col gap="3rem" flex={1} css={{ overflow: "hidden" }}>
                            {slots.Left}
                        </Col>
                        <Col flex={1} css={{ overflow: "hidden" }}>
                            {slots.Right}
                        </Col>
                    </Row>
                    {hasNfts && (
                        <Collapsable
                            defaultCollapsed={false}
                            label={translate("hideCollection")}
                            collapsedLabel={translate("showCollection")}
                        >
                            <NftPreviewCarousel
                                loading={loadingCollectionNfts}
                                nfts={collectionNfts}
                                activeId={activeCarouselNftId}
                                to={collectionNftLink}
                            />
                        </Collapsable>
                    )}
                </Col>
            </PageContent>
        );
    },
    ["Left", "Right"],
    {
        Left: BaseNftPageContentLeftSlot,
        Right: BaseNftPageContentRightSlot,
    },
);

export default BaseNftPageContent;
