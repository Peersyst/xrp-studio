import CollectionCardCarousel from "module/collection/component/display/CollectionCardCarousel/CollectionCardCarousel";
import { useGetUserCollections } from "module/user/query/useGetUserCollections";
import { Button, Col, Row, Typography } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";

const ProfileCollections = (): JSX.Element => {
    const translate = useTranslate();

    const { data: { pages } = { pages: [] }, isLoading } = useGetUserCollections();
    const collections = pages[0]?.items || [];

    return (
        <Row css={{ height: "12rem", width: "100%" }}>
            {collections.length === 0 && !isLoading ? (
                <Col flex={1} alignItems="center" justifyContent="center" gap="2rem">
                    <Typography variant="h6" fontWeight="bold" light>
                        {translate("youHaveNoCollections")}
                    </Typography>
                    <Button>{translate("createCollection")}</Button>
                </Col>
            ) : (
                <CollectionCardCarousel collections={collections} isLoading={isLoading} />
            )}
        </Row>
    );
};

export default ProfileCollections;
