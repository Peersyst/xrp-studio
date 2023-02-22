import { Col, Row, Skeleton, Typography } from "@peersyst/react-components";
import { CollectionInfoRoot, CollectionMainInfo, CollectionsButtons } from "./CollectionInfo.styles";
import { useParams } from "react-router-dom";
import useTranslate from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import { useNavigate } from "react-router-dom";
import { CollectionRoutes } from "module/collection/router/CollectionRouter";
import ShareButton from "module/common/component/input/ShareButton/ShareButton";
import { SocialShareOptions } from "module/common/component/input/ShareButton/ShareButton.types";
import useWallet from "module/wallet/hook/useWallet";
import useGetCollectionByPath from "module/collection/query/useGetCollectionByPath";

const CollectionInfo = (): JSX.Element => {
    const { path } = useParams<string>();
    const translate = useTranslate();
    const navigate = useNavigate();
    const { address } = useWallet();

    const { data: { name, items = 0, account } = {}, isLoading: collectionLoading } = useGetCollectionByPath(path);
    const isOwnCollection = account === address;

    const shareData: ShareData = {
        title: "XRP Studio",
        text: translate(isOwnCollection ? "checkoutMyCollection" : "checkoutThisCollection"),
        url: window.location.origin + CollectionRoutes.VIEW_COLLECTION.replace(":path", path!),
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
            {!collectionLoading && (
                <CollectionsButtons gap="0.5rem">
                    <ShareButton shareData={shareData} networks={[SocialShareOptions.TWITTER]} />
                    {address && isOwnCollection && (
                        <Button size="sm" onClick={() => navigate(CollectionRoutes.EDIT_COLLECTION.replace(":path", path!))}>
                            {translate("editCollection")}
                        </Button>
                    )}
                </CollectionsButtons>
            )}
        </CollectionInfoRoot>
    );
};

export default CollectionInfo;
