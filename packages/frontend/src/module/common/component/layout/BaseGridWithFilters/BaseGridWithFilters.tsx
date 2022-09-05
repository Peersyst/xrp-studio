import { Animated, Col, Row, TransitionStyles, useTheme } from "@peersyst/react-components";
import { useMediaQuery } from "@peersyst/react-hooks";
import { PaginatedData } from "query-utils";
import { useRecoilValue } from "recoil";
import { filtersVisibilityState } from "../../state/FiltersVisibilityState";
import BaseGrid from "../BaseGrid/BaseGrid";
import BaseGridFilters from "./BaseGridFilters/BaseGridFilters";
import { BaseGridTags } from "./BaseGridTags/BaseGridTags";
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
    ...rest
}: BaseGridWithFilterProps<T>): JSX.Element {
    const {
        breakpoints: {
            values: { mobile },
        },
    } = useTheme();
    const showFilters = useRecoilValue(filtersVisibilityState);
    const finalBreakPoints = showFilters ? filterBreakpoints : breakpoints;
    const isMobile = useMediaQuery(`(max-width: ${mobile}px)`);
    const finalMoveGrid = showFilters && !isMobile;

    return (
        <Row css={{ position: "relative" }}>
            {showFilters && <BaseGridFilters filters={filters} />}
            <Animated
                in={finalMoveGrid}
                duration={500}
                animation={gridAnimation}
                animatedProperties="transform"
                hideOnExit={false}
                style={{ transformOrigin: "100% 0" }}
            >
                <Col gap="2rem">
                    <BaseGridTags />
                    <BaseGrid<T> justifyContent="center" {...rest} breakpoints={finalBreakPoints} />
                </Col>
            </Animated>
        </Row>
    );
}

export default BaseGridWithFilters;
