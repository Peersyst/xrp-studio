import { CollectionGridProps } from "module/collection/component/layout/CollectionGrid/CollectionGrid.types";
import Grid from "module/common/component/layout/Grid/Grid";
import { PaginatedCollectionDto } from "module/api/service";
import { useGetCollectionGridBreakpoints } from "module/collection/component/layout/CollectionGrid/hooks/useGetCollectionGridBreakpoints";
import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import CollectionCard from "module/collection/component/display/CollectionCard/CollectionCard";

function CollectionGrid<TagT>({ loading, ...rest }: CollectionGridProps<TagT>): JSX.Element {
    const breakpoints = useGetCollectionGridBreakpoints();
    return (
        <Grid<PaginatedCollectionDto, TagT> loading={loading} breakpoints={breakpoints} Skeletons={BaseCardSkeletons} {...rest}>
            {(collections) => collections.map((collection, key) => <CollectionCard size="lg" collection={collection} key={key} />)}
        </Grid>
    );
}

export default CollectionGrid;
