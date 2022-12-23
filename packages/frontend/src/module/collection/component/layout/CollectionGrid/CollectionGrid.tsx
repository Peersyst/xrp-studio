import { CollectionGridProps } from "module/collection/component/layout/CollectionGrid/CollectionGrid.types";
import Grid from "module/common/component/layout/Grid/Grid";
import { PaginatedCollectionDto } from "module/api/service";
import { CollectionCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import CollectionCard from "module/collection/component/display/CollectionCard/CollectionCard";
import { GridProps } from "module/common/component/layout/Grid/Grid.types";
import useCollectionGridConfig from "module/collection/component/layout/CollectionGrid/hooks/useCollectionGridConfig";

function InnerCollectionGrid({
    loading,
    nothingToShow,
    cols = 3,
    ...rest
}: Omit<GridProps<PaginatedCollectionDto>, "Skeletons" | "children" | "breakpoints">) {
    const {
        nothingToShow: collectionNothingToShow,
        cols: collectionGridCols,
        breakpoints,
        tabletBreakpoint,
    } = useCollectionGridConfig({ nothingToShow, cols });

    return (
        <Grid<PaginatedCollectionDto, any>
            loading={loading}
            breakpoints={breakpoints}
            tabletBreakPoint={tabletBreakpoint}
            Skeletons={CollectionCardSkeletons}
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

function InnerCollectionGridWithFilters({ loading, ...rest }: Omit<CollectionGridProps, "filters">) {
    return <InnerCollectionGrid withFilters loading={loading} {...rest} />;
}

function CollectionGrid({ loading, withFilters, ...rest }: CollectionGridProps): JSX.Element {
    return withFilters ? (
        <InnerCollectionGridWithFilters loading={loading} {...rest} />
    ) : (
        <InnerCollectionGrid loading={loading} {...rest} />
    );
}

export default CollectionGrid;
