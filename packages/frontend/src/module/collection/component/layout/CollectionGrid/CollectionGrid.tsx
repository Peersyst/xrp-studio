import { CollectionGridProps } from "module/collection/component/layout/CollectionGrid/CollectionGrid.types";
import Grid from "module/common/component/layout/Grid/Grid";
import { PaginatedCollectionDto } from "module/api/service";
import { useCollectionGridBreakpoints } from "module/collection/component/layout/CollectionGrid/hooks/useCollectionGridBreakpoints";
import { LgCollectionCardSkeletons } from "module/common/component/feedback/Skeletons/Skeletons";
import CollectionCard from "module/collection/component/display/CollectionCard/CollectionCard";
import { GridProps } from "module/common/component/layout/Grid/Grid.types";
import { useRecoilState } from "recoil";
import { filtersVisibilityState } from "module/common/component/state/FiltersVisibilityState";
import useCollectionFilters from "module/collection/hook/useCollectionFilters";

function InnerCollectionGrid({
    loading,
    nothingToShow,
    ...rest
}: Omit<GridProps<PaginatedCollectionDto>, "Skeletons" | "children" | "breakpoints">) {
    const breakpoints = useCollectionGridBreakpoints();
    const gridFilters = useCollectionFilters();

    const hasFilters = !!gridFilters.query;

    return (
        <Grid<PaginatedCollectionDto, any>
            loading={loading}
            breakpoints={breakpoints}
            Skeletons={LgCollectionCardSkeletons}
            css={{ width: "fit-content" }}
            justifyContent="stretch"
            nothingToShow={hasFilters ? "text" : nothingToShow}
            {...rest}
        >
            {(collections) => collections.map((collection, key) => <CollectionCard size="lg" collection={collection} key={key} />)}
        </Grid>
    );
}

function InnerCollectionGridWithFilters({ loading, ...rest }: Omit<CollectionGridProps, "filters">) {
    const [hideFiltersState] = useRecoilState(filtersVisibilityState);

    return <InnerCollectionGrid withFilters cols={hideFiltersState ? 2 : 3} loading={loading} {...rest} />;
}

function CollectionGrid({ loading, withFilters, ...rest }: CollectionGridProps): JSX.Element {
    return withFilters ? (
        <InnerCollectionGridWithFilters loading={loading} {...rest} />
    ) : (
        <InnerCollectionGrid loading={loading} {...rest} />
    );
}

export default CollectionGrid;
