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

        return (
            <PageContent css={{ paddingBottom: collectionNfts ? 0 : undefined }}>
                <Col flex={1} gap="1.5rem">
                    <Row gap="1.5rem" flex={1} breakpoint={{ width: "nftPage", alignItems: "stretch", gap: "1.5rem" }}>
                        <Col gap="3rem" flex={1}>
                            {slots.Left}
                        </Col>
                        <Col flex={1}>{slots.Right}</Col>
                    </Row>
                    {collectionNfts && (
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
