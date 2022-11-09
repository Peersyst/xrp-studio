import { Col, Row, Skeleton, Typography, useTheme } from "@peersyst/react-components";
import { CollectionInfoRoot, CollectionsButtons, CollectionsMainInfo } from "./CollectionInfo.styles";
import { useParams } from "react-router-dom";
import useGetCollection from "module/nft/query/useGetCollection";
import useTranslate from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import { useNavigate } from "react-router-dom";
import { CollectionRoutes } from "module/collection/CollectionRouter";
import { useMediaQuery } from "@peersyst/react-hooks";

const CollectionInfo = (): JSX.Element => {
    const { id } = useParams<string>();
    const translate = useTranslate();
    const { data: collection, isLoading: collectionLoading } = useGetCollection(id ? Number(id) : undefined);
    const { name = "", items = 0 } = collection || {};
    const navigate = useNavigate();
    const {
        breakpoints: {
            values: { sm },
        },
    } = useTheme();
    const isSm = useMediaQuery(`(max-width: ${sm}px)`);
    return (
        <CollectionInfoRoot>
            <Col flex={1} gap={isSm ? "0.5rem" : "1rem"}>
                <Row justifyContent="space-between" css={{ maxWidth: "100%" }}>
                    <CollectionsMainInfo gap="1rem" alignItems="center" breakpoint={{ width: "mobile", gap: "0.5rem" }}>
                        <Skeleton width="200px" loading={collectionLoading}>
                            <Typography className="collection-name" variant="h5" fontWeight={800} singleLine style={{ flex: 2 }}>
                                {name}
                            </Typography>
                            <Typography className="collection-item" variant="body1" light singleLine style={{ flex: 1 }}>
                                {translate("itemWithCount_other", { count: items })}
                            </Typography>
                        </Skeleton>
                    </CollectionsMainInfo>
                </Row>
                <Skeleton width="70%" loading={collectionLoading}>
                    <Typography className="collection-description" variant="body1" light singleLine={isSm ? true : false}>
                        {collection?.description}
                    </Typography>
                </Skeleton>
            </Col>
            <CollectionsButtons gap="0.5rem">
                <Button size="sm" onClick={() => navigate(CollectionRoutes.CREATE_COLLECTION)}>
                    {translate("editCollection")}
                </Button>
            </CollectionsButtons>
        </CollectionInfoRoot>
    );
};

export default CollectionInfo;
