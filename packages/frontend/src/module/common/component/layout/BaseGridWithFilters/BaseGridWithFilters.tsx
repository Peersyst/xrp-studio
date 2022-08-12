import { Col } from "@peersyst/react-components";
import { PaginatedData } from "query-utils";
import { useRecoilValue } from "recoil";
import { filtersVisibilityState } from "../../state/FiltersVisibilityState";
import BaseGrid from "../BaseGrid/BaseGrid";
import { BaseGridFilters } from "./BaseGridFilters/BaseGridFilters";
import { BaseGridWithFilterProps } from "./BaseGridWithFilters.types";

function BaseGridWithFilters<T extends PaginatedData>({
    filterBreakpoints,
    breakpoints,
    filters,
    ...rest
}: BaseGridWithFilterProps<T>): JSX.Element {
    const showFilters = useRecoilValue(filtersVisibilityState);
    const finalBreakPoints = showFilters ? filterBreakpoints : breakpoints;
    return (
        <Col>
            <BaseGridFilters />
            <BaseGrid<T> moveGrid={showFilters} {...rest} breakpoints={finalBreakPoints} />
        </Col>
    );
}

export default BaseGridWithFilters;
