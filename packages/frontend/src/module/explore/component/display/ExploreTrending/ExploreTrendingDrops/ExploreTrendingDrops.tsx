import { Grid } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { ExploreTrendingComponentProps } from "module/explore/Explore.types";
import { ExploreRoutes } from "module/explore/ExploreRouter";
import ExploreSection from "module/explore/component/layout/ExploreSection/ExploreSection";
import { useCollectionGridBreakpoints } from "module/collection/component/layout/CollectionGrid/hooks/useCollectionGridBreakpoints";
import { CollectionGridCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import { useGetTrends } from "module/explore/query/useGetTrending";
import DropCard from "module/drop/component/display/DropCard/DropCard";

const ExploreTrendingDrops = ({ ...rest }: ExploreTrendingComponentProps): JSX.Element => {
    const translate = useTranslate();

    const { data: { drops } = { drops: [] }, isLoading } = useGetTrends();

    const breakpoints = useCollectionGridBreakpoints();

    return (
        <ExploreSection loading={isLoading} title={translate("drops")} viewMoreLink={ExploreRoutes.DROPS} {...rest}>
            <Grid cols={3} css={{ width: "100%" }} justifyContent="stretch" breakpoints={breakpoints}>
                {isLoading ? (
                    <CollectionGridCardSkeletons count={3} />
                ) : (
                    drops.slice(0, 3).map((drop, key) => <DropCard size="lg" drop={drop} key={key} css={{ width: "100%" }} />)
                )}
            </Grid>
        </ExploreSection>
    );
};

export default ExploreTrendingDrops;
