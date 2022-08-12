import { Animated, InfiniteScroll, Row, TransitionStyles, Typography, useTheme } from "@peersyst/react-components";
import { BaseGridRoot } from "./BaseGrid.styles";
import { PaginatedData } from "query-utils";
import { BaseGridProps } from "module/common/component/layout/BaseGrid/BaseGrid.types";
import { Fragment } from "react";
import { useMediaQuery } from "@peersyst/react-hooks";

const gridAnimation: TransitionStyles = {
    enter: {
        transform: "translateX(0)",
    },
    entering: {
        transform: "translateX(6rem)",
    },
    entered: {
        transform: "translateX(6rem)",
    },
    exit: {
        transform: "translateX(6rem)",
    },
    exiting: {
        transform: "translateX(0)",
    },
    exited: {
        transform: "translateX(0)",
    },
};

function BaseGrid<T extends PaginatedData>({
    loading,
    children: renderItems,
    data,
    observerOffset = "10vh",
    callback,
    container,
    loaderElement,
    end,
    endElement,
    rowSize,
    Skeletons,
    cols,
    colGap,
    rowGap,
    alignItems,
    justifyContent,
    justifyItems,
    breakpoints,
    nothingToShow,
    moveGrid = false,
}: BaseGridProps<T>): JSX.Element {
    const {
        breakpoints: {
            values: { mobile },
        },
    } = useTheme();

    const hasItems = loading || !!data?.pages[0]?.items?.[0];
    const isMobile = useMediaQuery(`(max-width: ${mobile}px)`);
    const finalMoveGrid = moveGrid && !isMobile;

    const infiniteScrollProps = { container, loaderElement, end, endElement, callback, observerOffset, loading };
    const gridProps = {
        rowSize,
        cols,
        colGap,
        breakpoints,
        rowGap,
        alignItems,
        justifyContent,
        justifyItems,
    };

    return (
        <InfiniteScroll {...infiniteScrollProps}>
            <Animated
                in={finalMoveGrid}
                duration={500}
                animation={gridAnimation}
                animatedProperties="transform"
                hideOnExit={false}
                style={{ transformOrigin: "100% 0" }}
            >
                <Row flex={1} justifyContent="center">
                    {hasItems ? (
                        <BaseGridRoot {...gridProps}>
                            {data?.pages.map((page, i) => (
                                <Fragment key={i}>{renderItems(page.items)}</Fragment>
                            ))}
                            {loading && <Skeletons count={18} />}
                        </BaseGridRoot>
                    ) : typeof nothingToShow === "string" ? (
                        <Typography variant="h4">{nothingToShow}</Typography>
                    ) : (
                        nothingToShow
                    )}
                </Row>
            </Animated>
        </InfiniteScroll>
    );
}

export default BaseGrid;
