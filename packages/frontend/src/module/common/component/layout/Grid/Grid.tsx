import { PaginatedData } from "query-utils";
import { FiltersBaseContextValue } from "../../input/Filters/FiltersContext";
import BaseGrid from "../BaseGrid/BaseGrid";
import BaseGridWithFilters from "../BaseGridWithFilters/BaseGridWithFilters";
import { GridProps } from "./Grid.types";

function Grid<T extends PaginatedData, TagT, F extends FiltersBaseContextValue>({
    filterBreakpoints,
    filters,
    filtersContext,
    tags,
    onClearTags,
    onTagClicked,
    ...baseGridProps
}: GridProps<T, TagT, F>): JSX.Element {
    return filtersContext ? (
        <BaseGridWithFilters<T, TagT, F>
            filtersContext={filtersContext}
            filterBreakpoints={filterBreakpoints}
            filters={filters}
            tags={tags}
            onClearTags={onClearTags}
            onTagClicked={onTagClicked}
            {...baseGridProps}
        />
    ) : (
        <BaseGrid<T> {...baseGridProps} />
    );
}

export default Grid;
