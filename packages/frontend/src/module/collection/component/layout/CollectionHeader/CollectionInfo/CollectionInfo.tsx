import { Col, Row, Skeleton, Typography } from "@peersyst/react-components";
import { CollectionInfoRoot, CollectionMainInfo, CollectionsButtons } from "./CollectionInfo.styles";
import { useParams } from "react-router-dom";
import useGetCollection from "module/collection/query/useGetCollection";
import useTranslate from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import { useNavigate } from "react-router-dom";
import { CollectionRoutes } from "module/collection/router/CollectionRouter";
import ShareButton from "module/common/component/input/ShareButton/ShareButton";
import { SocialShareOptions } from "module/common/component/input/ShareButton/ShareButton.types";
import useWallet from "module/wallet/hook/useWallet";

const CollectionInfo = (): JSX.Element => {
    const { id } = useParams<string>();
    const translate = useTranslate();
    const { data: collection, isLoading: collectionLoading } = useGetCollection(id ? Number(id) : undefined);
    const { name, items = 0 } = collection || {};
    const navigate = useNavigate();
    const { address } = useWallet();

    const shareData: ShareData = {
        title: "XRP Studio",
        text: translate("checkoutMyCollection"),
        url: window.location.origin + CollectionRoutes.VIEW_COLLECTION.replace(":id", id ? String(id) : ""),
    };
    return (
        <CollectionInfoRoot gap={"0.5rem"}>
            <Col flex={1} gap="0.5rem">
                <Row justifyContent="space-between" css={{ maxWidth: "100%" }}>
                    <CollectionMainInfo gap="1rem" alignItems="center" breakpoint={{ width: "mobile", gap: "1rem" }}>
                        <Skeleton width="200px" loading={collectionLoading}>
                            <Typography
                                className="collection-name"
                                variant="h5"
                                fontWeight={800}
                                singleLine
                                style={{ flex: 2 }}
                                fontStyle={!name ? "italic" : undefined}
                            >
                                {name || translate("unnamed")}
                            </Typography>
                        </Skeleton>
                    </CollectionMainInfo>
                </Row>
                <Skeleton width="60px" loading={collectionLoading}>
                    <Typography className="collection-item" variant="body1" light singleLine style={{ flex: 1 }}>
                        {translate("itemWithCount_other", { count: items ? items : 0 })}
                    </Typography>
                </Skeleton>
            </Col>
            <CollectionsButtons gap="0.5rem">
                <ShareButton shareData={shareData} networks={[SocialShareOptions.TWITTER]} />
                {address && address === collection?.account && (
                    <Button size="sm" onClick={() => navigate(CollectionRoutes.EDIT_COLLECTION.replace(":id", id!.toString()))}>
                        {translate("editCollection")}
                    </Button>
                )}
            </CollectionsButtons>
        </CollectionInfoRoot>
    );
};

export default CollectionInfo;
