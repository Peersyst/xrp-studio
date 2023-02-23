import { Animated, Row } from "@peersyst/react-components";
import { useMediaQuery } from "@peersyst/react-hooks";
import { PaginatedData } from "query-utils";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { filtersVisibilityState } from "../../state/FiltersVisibilityState";
import BaseGrid from "../BaseGrid/BaseGrid";
import BaseGridFilters from "./BaseGridFilters/BaseGridFilters";
import BaseGridTags from "./BaseGridTags/BaseGridTags";
import { gridAnimation, GridWrapper } from "./BaseGridWithFilters.styles";
import { BaseGridWithFilterProps } from "./BaseGridWithFilters.types";

function BaseGridWithFilters<T extends PaginatedData, TagT = any>({
    filterBreakpoints,
    breakpoints,
    filters,
    tags = [],
    onDeleteTagClicked,
    onClearTags,
    withExtraSpace,
    tabletBreakPoint,
    ...rest
}: BaseGridWithFilterProps<T, TagT>): JSX.Element {
    const [showFilters, setShowFilters] = useRecoilState(filtersVisibilityState);
    const finalBreakPoints = showFilters ? filterBreakpoints || breakpoints : breakpoints;
    const isTablet = useMediaQuery(`(max-width: ${tabletBreakPoint}px)`);
    const finalMoveGrid = showFilters && !isTablet;

    useEffect(() => {
        if (isTablet) setShowFilters(false);
    }, [isTablet]);

    useEffect(() => {
        if (isTablet) setShowFilters(false);
        else setShowFilters(true);
    }, []);

    return (
        <Row css={{ position: "relative", minHeight: "76vh" }}>
            <BaseGridFilters withExtraSpace={withExtraSpace}>{filters}</BaseGridFilters>
            <Animated
                in={finalMoveGrid}
                duration={500}
                animation={gridAnimation}
                delay={{ enter: 0, exit: 35 }}
                animatedProperties="transform"
                hideOnExit={false}
                style={{ transformOrigin: "100% 0" }}
            >
                <GridWrapper flex={1} justifyContent="center" isOpen={showFilters}>
                    <BaseGridTags
                        tags={tags}
                        onDeleteTagClicked={onDeleteTagClicked}
                        onClear={onClearTags}
                        withExtraSpace={withExtraSpace}
                    />
                    <BaseGrid<T> justifyContent={isTablet ? "center" : "flex-start"} {...rest} breakpoints={finalBreakPoints} />
                </GridWrapper>
            </Animated>
        </Row>
    );
}

export default BaseGridWithFilters;
