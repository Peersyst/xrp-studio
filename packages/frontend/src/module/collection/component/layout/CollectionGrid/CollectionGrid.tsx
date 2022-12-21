import { CollectionGridProps } from "module/collection/component/layout/CollectionGrid/CollectionGrid.types";
import Grid from "module/common/component/layout/Grid/Grid";
import { PaginatedCollectionDto } from "module/api/service";
import { useCollectionGridBreakpoints } from "module/collection/component/layout/CollectionGrid/hooks/useCollectionGridBreakpoints";
import { CollectionCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import CollectionCard from "module/collection/component/display/CollectionCard/CollectionCard";
import { GridProps } from "module/common/component/layout/Grid/Grid.types";
import useCollectionGridConfig from "module/collection/component/layout/CollectionGrid/hooks/useCollectionGridConfig";
import { useTheme } from "@peersyst/react-components";

function InnerCollectionGrid({ loading, ...rest }: Omit<GridProps<PaginatedCollectionDto>, "Skeletons" | "children" | "breakpoints">) {
    const breakpoints = useCollectionGridBreakpoints();
    const {
        breakpoints: {
            values: { collectionsGrid },
        },
    } = useTheme();

    return (
        <Grid<PaginatedCollectionDto, any>
            loading={loading}
            breakpoints={breakpoints}
            tabletBreakPoint={collectionsGrid.xxs}
            Skeletons={CollectionCardSkeletons}
            css={{ width: "fit-content" }}
            justifyContent="stretch"
            alignItems="flex-start"
            {...rest}
        >
            {(collections) =>
                collections.map((collection, key) => <CollectionCard size="lg" gridWidth collection={collection} key={key} />)
            }
        </Grid>
    );
}

function InnerCollectionGridWithFilters({ loading, nothingToShow, cols = 3, ...rest }: Omit<CollectionGridProps, "filters">) {
    const { nothingToShow: collectionNothingToShow, cols: collectionGridCols } = useCollectionGridConfig({ nothingToShow, cols });

    return (
        <InnerCollectionGrid withFilters loading={loading} nothingToShow={collectionNothingToShow} cols={collectionGridCols} {...rest} />
    );
}

function CollectionGrid({ loading, withFilters, ...rest }: CollectionGridProps): JSX.Element {
    return withFilters ? (
        <InnerCollectionGridWithFilters loading={loading} {...rest} />
    ) : (
        <InnerCollectionGrid loading={loading} {...rest} />
    );
}

export default CollectionGrid;
