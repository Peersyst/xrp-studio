import { Col, Row, Skeleton, Typography } from "@peersyst/react-components";
import { ProfileMainInfo } from "module/user/component/layout/ProfileHeader/ProfileInfo/ProfileInfo.styles";
import { CollectionInfoRoot } from "./CollectionInfo.styles";
import { useParams } from "react-router-dom";
import useGetCollection from "module/nft/query/useGetCollection";
import useTranslate from "module/common/hook/useTranslate";

const CollectionInfo = (): JSX.Element => {
    const { id } = useParams<string>();
    const translate = useTranslate();
    const { data: collection, isLoading: collectionLoading } = useGetCollection(id ? Number(id) : undefined);
    const { name = "", items = 0 } = collection || {};
    return (
        <CollectionInfoRoot>
            <Col flex={1} gap="0.5rem">
                <Row justifyContent="space-between" css={{ maxWidth: "100%" }}>
                    <ProfileMainInfo gap="1rem" alignItems="center" breakpoint={{ width: "mobile", gap: "1rem" }}>
                        <Skeleton width="200px" loading={collectionLoading}>
                            <Typography className="collection-name" variant="h5" fontWeight={800} singleLine>
                                {name}
                            </Typography>
                        </Skeleton>
                    </ProfileMainInfo>
                </Row>
                <Skeleton width="70%" loading={collectionLoading}>
                    <Typography className="collection-description" variant="body1" light singleLine>
                        {translate("itemWithCount_other", { count: items })}
                    </Typography>
                </Skeleton>
            </Col>
        </CollectionInfoRoot>
    );
};

export default CollectionInfo;
