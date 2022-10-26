import { PaginatedData } from "query-utils";
import BaseGrid from "../BaseGrid/BaseGrid";
import BaseGridWithFilters from "../BaseGridWithFilters/BaseGridWithFilters";
import { GridProps } from "./Grid.types";

function Grid<T extends PaginatedData, TagT>({
    filterBreakpoints,
    filters,
    withFilters = true,
    tags,
    onClearTags,
    onTagClicked,
    ...baseGridProps
}: GridProps<T, TagT>): JSX.Element {
    return withFilters ? (
        <BaseGridWithFilters<T, TagT>
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
