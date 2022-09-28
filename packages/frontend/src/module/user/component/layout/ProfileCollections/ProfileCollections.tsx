import CollectionCardCarousel from "module/collection/component/display/CollectionCardCarousel/CollectionCardCarousel";
import { useGetUserCollections } from "module/user/query/useGetUserCollections";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import { Button, Col, Row, Typography } from "@peersyst/react-components";

const ProfileCollections = (): JSX.Element => {
    const { data: { pages } = { pages: [] }, isLoading } = useGetUserCollections();
    const collections = pages[0]?.items || [];
    return (
        <Row css={{ height: "12rem", width: "100%" }}>
            {collections.length === 0 && !isLoading ? (
                <NothingToShow>
                    <Col flex={1} alignItems="center" justifyContent="center" gap="2rem">
                        <Typography variant="h6" fontWeight="bold" light>
                            You have no collections
                        </Typography>
                        <Button>Create collection</Button>
                    </Col>
                </NothingToShow>
            ) : (
                <CollectionCardCarousel collections={collections} isLoading={!isLoading} />
            )}
        </Row>
    );
};

export default ProfileCollections;
