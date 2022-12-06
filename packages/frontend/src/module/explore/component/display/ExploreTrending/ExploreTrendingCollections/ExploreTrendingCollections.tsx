import { Col, Grid, Row, Skeleton, Typography } from "@peersyst/react-components";
import CollectionCard from "module/collection/component/display/CollectionCard/CollectionCard";
import useTranslate from "module/common/hook/useTranslate";
import { ExploreTrendingCollectionsProps } from "module/explore/Explore.types";
import Link from "module/common/component/navigation/Link/Link";
import { ExploreRoutes } from "module/explore/ExploreRouter";
import { useGetNftGridBreakpoints } from "module/nft/component/layout/NftGrid/hook/useGetNftGridBreakpoints";

const ExploreTrendingCollections = ({ collections = [], loading = false, ...rest }: ExploreTrendingCollectionsProps): JSX.Element => {
    const translate = useTranslate();
    const breakpoints = useGetNftGridBreakpoints();
    return (
        <Col gap="1.5rem">
            <Skeleton loading={loading}>
                <Row gap={"1.5rem"}>
                    <Typography variant="h3" fontWeight={800}>
                        {translate("collections")}
                    </Typography>
                    <Link to={ExploreRoutes.COLLECTIONS} variant="body2">
                        <Typography variant="h5" fontWeight={500} color={"status.info"} css={{ lineHeight: "2.5rem" }}>
                            {translate("viewAll")}
                        </Typography>
                    </Link>
                </Row>
            </Skeleton>
            <Grid cols={3} css={{ width: "fit-content" }} justifyContent="stretch" {...rest} breakpoints={breakpoints}>
                {collections.slice(0, 3).map((collection, key) => (
                    <CollectionCard size="lg" collection={collection} key={key} />
                ))}
            </Grid>
        </Col>
    );
};

export default ExploreTrendingCollections;
