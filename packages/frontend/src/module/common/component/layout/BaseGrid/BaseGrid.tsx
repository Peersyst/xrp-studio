import { InfiniteScroll, Row } from "@peersyst/react-components";
import { BaseGridRoot } from "./BaseGrid.styles";
import { PaginatedData } from "query-utils";
import { BaseGridProps } from "module/common/component/layout/BaseGrid/BaseGrid.types";
import { useState, Fragment } from "react";

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
    filterBreakpoints,
}: BaseGridProps<T>): JSX.Element {
    const hasItems = loading || !!data;
    const [filtersExited] = useState(true);

    const infiniteScrollProps = { container, loaderElement, end, endElement, callback, observerOffset, loading };
    const gridProps = {
        rowSize,
        cols,
        colGap,
        breakpoints: filtersExited ? breakpoints : filterBreakpoints,
        rowGap,
        alignItems,
        justifyContent,
        justifyItems,
    };

    return (
        <>
            <InfiniteScroll {...infiniteScrollProps}>
                <Row flex={1} justifyContent="center">
                    {hasItems && (
                        <BaseGridRoot {...gridProps}>
                            {data?.pages.map((page, i) => (
                                <Fragment key={i}>{renderItems(page.items)}</Fragment>
                            ))}
                            {loading && <Skeletons count={18} />}
                        </BaseGridRoot>
                    )}
                </Row>
            </InfiniteScroll>
        </>
    );
}

export default BaseGrid;
