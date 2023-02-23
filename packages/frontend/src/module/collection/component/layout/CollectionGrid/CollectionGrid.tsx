import Grid from "module/common/component/layout/Grid/Grid";
import { PaginatedCollectionDto } from "module/api/service";
import { CollectionGridCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import CollectionCard from "module/collection/component/display/CollectionCard/CollectionCard";
import { GridProps } from "module/common/component/layout/Grid/Grid.types";
import useCollectionGridConfig from "module/collection/component/layout/CollectionGrid/hooks/useCollectionGridConfig";

function CollectionGrid({
    loading,
    nothingToShow,
    cols = 3,
    withFilters = false,
    ...rest
}: Omit<GridProps<PaginatedCollectionDto>, "Skeletons" | "children" | "breakpoints">): JSX.Element {
    const {
        nothingToShow: collectionNothingToShow,
        cols: collectionGridCols,
        breakpoints,
        tabletBreakpoint,
    } = useCollectionGridConfig({ nothingToShow, cols, withFilters });

    return (
        <Grid<PaginatedCollectionDto, any>
            withFilters={withFilters}
            loading={loading}
            breakpoints={breakpoints}
            tabletBreakPoint={tabletBreakpoint}
            Skeletons={CollectionGridCardSkeletons}
            css={{ width: "fit-content" }}
            justifyContent="stretch"
            alignItems="flex-start"
            nothingToShow={collectionNothingToShow}
            cols={collectionGridCols}
            {...rest}
        >
            {(collections) =>
                collections.map((collection, key) => <CollectionCard size="lg" gridWidth collection={collection} key={key} />)
            }
        </Grid>
    );
}

export default CollectionGrid;
