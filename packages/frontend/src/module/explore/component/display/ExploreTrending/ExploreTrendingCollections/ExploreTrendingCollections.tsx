import { Grid } from "@peersyst/react-components";
import CollectionCard from "module/collection/component/display/CollectionCard/CollectionCard";
import useTranslate from "module/common/hook/useTranslate";
import { ExploreTrendingCollectionsProps } from "module/explore/Explore.types";
import { ExploreRoutes } from "module/explore/ExploreRouter";
import ExploreSection from "module/explore/component/layout/ExploreSection/ExploreSection";
import { useCollectionGridBreakpoints } from "module/collection/component/layout/CollectionGrid/hooks/useCollectionGridBreakpoints";
import { LgCollectionCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";

const ExploreTrendingCollections = ({ collections = [], loading = false, ...rest }: ExploreTrendingCollectionsProps): JSX.Element => {
    const translate = useTranslate();

    const breakpoints = useCollectionGridBreakpoints();

    return (
        <ExploreSection loading={loading} title={translate("collections")} viewMoreLink={ExploreRoutes.COLLECTIONS} {...rest}>
            <Grid cols={3} css={{ width: "100%" }} justifyContent="stretch" breakpoints={breakpoints}>
                {loading ? (
                    <LgCollectionCardSkeletons count={3} />
                ) : (
                    collections
                        .slice(0, 3)
                        .map((collection, key) => <CollectionCard size="lg" collection={collection} key={key} css={{ width: "100%" }} />)
                )}
            </Grid>
        </ExploreSection>
    );
};

export default ExploreTrendingCollections;
