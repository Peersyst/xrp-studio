import { CollectionGridProps } from "module/collection/component/layout/CollectionGrid/CollectionGrid.types";
import Grid from "module/common/component/layout/Grid/Grid";
import { PaginatedCollectionDto } from "module/api/service";
import { useCollectionGridBreakpoints } from "module/collection/component/layout/CollectionGrid/hooks/useCollectionGridBreakpoints";
import { LgCollectionCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import CollectionCard from "module/collection/component/display/CollectionCard/CollectionCard";

function CollectionGrid({ loading, ...rest }: CollectionGridProps): JSX.Element {
    const breakpoints = useCollectionGridBreakpoints();
    return (
        <Grid<PaginatedCollectionDto, any>
            loading={loading}
            breakpoints={breakpoints}
            Skeletons={LgCollectionCardSkeletons}
            css={{ width: "fit-content" }}
            justifyContent="stretch"
            {...rest}
        >
            {(collections) => collections.map((collection, key) => <CollectionCard size="lg" collection={collection} key={key} />)}
        </Grid>
    );
}

export default CollectionGrid;
