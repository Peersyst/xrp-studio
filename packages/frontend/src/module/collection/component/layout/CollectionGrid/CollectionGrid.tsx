import { CollectionGridProps } from "module/collection/component/layout/CollectionGrid/CollectionGrid.types";
import Grid from "module/common/component/layout/Grid/Grid";
import { PaginatedCollectionDto } from "module/api/service";
import { useCollectionGridBreakpoints } from "module/collection/component/layout/CollectionGrid/hooks/useCollectionGridBreakpoints";
import { BaseCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import CollectionCard from "module/collection/component/display/CollectionCard/CollectionCard";

function CollectionGrid<TagT>({ loading, ...rest }: CollectionGridProps<TagT>): JSX.Element {
    const breakpoints = useCollectionGridBreakpoints();
    return (
        <Grid<PaginatedCollectionDto, TagT>
            loading={loading}
            breakpoints={breakpoints}
            Skeletons={BaseCardSkeletons}
            css={{ width: "fit-content" }}
            {...rest}
        >
            {(collections) => collections.map((collection, key) => <CollectionCard size="lg" collection={collection} key={key} />)}
        </Grid>
    );
}

export default CollectionGrid;
