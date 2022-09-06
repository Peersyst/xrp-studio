import { Animated, Row, TransitionStyles, useTheme } from "@peersyst/react-components";
import { useMediaQuery } from "@peersyst/react-hooks";
import { PaginatedData } from "query-utils";
import { useRecoilValue } from "recoil";
import { filtersVisibilityState } from "../../state/FiltersVisibilityState";
import BaseGrid from "../BaseGrid/BaseGrid";
import BaseGridFilters from "./BaseGridFilters/BaseGridFilters";
import { BaseGridTags } from "./BaseGridTags/BaseGridTags";
import { GridWrapper } from "./BaseGridWithFilters.styles";
import { BaseGridWithFilterProps } from "./BaseGridWithFilters.types";

const gridAnimation: TransitionStyles = {
    enter: {
        transform: "translateX(0)",
    },
    entering: {
        transform: "translateX(18rem)",
    },
    entered: {
        transform: "translateX(18rem)",
    },
    exit: {
        transform: "translateX(18rem)",
    },
    exiting: {
        transform: "translateX(0)",
    },
    exited: {
        transform: "translateX(0)",
    },
};

function BaseGridWithFilters<T extends PaginatedData>({
    filterBreakpoints,
    breakpoints,
    filters,
    tags,
    ...rest
}: BaseGridWithFilterProps<T>): JSX.Element {
    const {
        breakpoints: {
            values: { mini },
        },
    } = useTheme();
    const showFilters = useRecoilValue(filtersVisibilityState);
    const finalBreakPoints = showFilters ? filterBreakpoints || breakpoints : breakpoints;
    const isTablet = useMediaQuery(`(max-width: ${mini}px)`);
    const finalMoveGrid = showFilters && !isTablet;

    return (
        <Row css={{ position: "relative", overflow: "hidden" }}>
            {showFilters && <BaseGridFilters filters={filters} />}
            <Animated
                in={finalMoveGrid}
                duration={500}
                animation={gridAnimation}
                animatedProperties="transform"
                hideOnExit={false}
                style={{ transformOrigin: "100% 0" }}
            >
                <GridWrapper gap="2rem" flex={1} justifyContent="center" isOpen={showFilters}>
                    <BaseGridTags>{tags}</BaseGridTags>
                    <BaseGrid<T> justifyContent="center" {...rest} breakpoints={finalBreakPoints} />
                </GridWrapper>
            </Animated>
        </Row>
    );
}

export default BaseGridWithFilters;
