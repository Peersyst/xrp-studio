import { Col, Row, Skeleton, Typography } from "@peersyst/react-components";
import { CollectionInfoRoot, CollectionMainInfo, CollectionsButtons } from "./CollectionInfo.styles";
import { useParams } from "react-router-dom";
import useGetCollection from "module/nft/query/useGetCollection";
import useTranslate from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import { useNavigate } from "react-router-dom";
import { CollectionRoutes } from "module/collection/CollectionRouter";

const CollectionInfo = (): JSX.Element => {
    const { id } = useParams<string>();
    const translate = useTranslate();
    const { data: collection, isLoading: collectionLoading } = useGetCollection(id ? Number(id) : undefined);
    const { name = "", items = 0 } = collection || {};
    const navigate = useNavigate();

    return (
        <CollectionInfoRoot>
            <Col flex={1} gap="0.5rem">
                <Row justifyContent="space-between" css={{ maxWidth: "100%" }}>
                    <CollectionMainInfo gap="1rem" alignItems="center" breakpoint={{ width: "mobile", gap: "1rem" }}>
                        <Skeleton width="200px" loading={collectionLoading}>
                            <Typography className="collection-name" variant="h5" fontWeight={800} singleLine style={{ flex: 2 }}>
                                {name}
                            </Typography>
                        </Skeleton>
                    </CollectionMainInfo>
                </Row>
                <Skeleton width="60px" loading={collectionLoading}>
                    <Typography className="collection-item" variant="body1" light singleLine style={{ flex: 1 }}>
                        {translate("itemWithCount_other", { count: items })}
                    </Typography>
                </Skeleton>
            </Col>
            <CollectionsButtons gap="0.5rem">
                <Button size="sm" onClick={() => navigate(`${CollectionRoutes.CREATE_COLLECTION}?id=${id}`)}>
                    {translate("editCollection")}
                </Button>
            </CollectionsButtons>
        </CollectionInfoRoot>
    );
};

export default CollectionInfo;
