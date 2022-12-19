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
import useTranslate from "module/common/hook/useTranslate";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";

function InnerCollectionGrid({ loading, ...rest }: Omit<GridProps<PaginatedCollectionDto>, "Skeletons" | "children" | "breakpoints">) {
    const breakpoints = useCollectionGridBreakpoints();
    const gridFilters = useCollectionFilters();
    const translateError = useTranslate("error");
    const [hideFiltersState] = useRecoilState(filtersVisibilityState);

    const hasFilters = !!gridFilters.query;

    return (
        <Grid<PaginatedCollectionDto, any>
            loading={loading}
            breakpoints={breakpoints}
            breakpointType="collection"
            Skeletons={LgCollectionCardSkeletons}
            css={{ width: "fit-content" }}
            justifyContent="stretch"
            alignItems="flex-start"
            nothingToShow={
                <NothingToShow label={hasFilters ? translateError("noMatchingCollections") : translateError("noCollectionsAvailable")} />
            }
            cols={hideFiltersState ? 2 : 3}
            {...rest}
        >
            {(collections) =>
                collections.map((collection, key) => <CollectionCard gridWidth size="lg" collection={collection} key={key} />)
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
