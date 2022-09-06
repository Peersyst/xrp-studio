import { InfiniteScroll, Row, Typography } from "@peersyst/react-components";
import { BaseGridRoot } from "./BaseGrid.styles";
import { PaginatedData } from "query-utils";
import { BaseGridProps } from "module/common/component/layout/BaseGrid/BaseGrid.types";
import { Fragment } from "react";

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
}: BaseGridProps<T>): JSX.Element {
    const hasItems = loading || !!data?.pages[0]?.items?.[0];
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
            <Row flex={1} justifyContent={justifyContent}>
                {hasItems ? (
                    <BaseGridRoot {...gridProps}>
                        {data?.pages.map((page, i) => (
                            <Fragment key={i}>{renderItems(page.items)}</Fragment>
                        ))}
                        {loading && <Skeletons count={18} />}
                    </BaseGridRoot>
                ) : typeof nothingToShow === "string" ? (
                    <Typography variant="h4" textAlign="center" css={{ width: "100%" }} fontWeight="bold" textTransform="uppercase">
                        {nothingToShow}
                    </Typography>
                ) : (
                    nothingToShow
                )}
            </Row>
        </InfiniteScroll>
    );
}

export default BaseGrid;
