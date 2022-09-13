import { InfiniteScroll, Row } from "@peersyst/react-components";
import { BaseGridRoot } from "./BaseGrid.styles";
import { PaginatedData } from "query-utils";
import { BaseGridProps } from "module/common/component/layout/BaseGrid/BaseGrid.types";
import { Fragment } from "react";
import NothingToShow from "../../feedback/NothingToShow/NothingToShow";

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
    const infiniteScrollProps = { container, loaderElement, endElement, callback, observerOffset, loading };
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
        <InfiniteScroll end={!hasItems || end} {...infiniteScrollProps}>
            <Row flex={1} css={{ minHeight: "40vh" }}>
                {hasItems ? (
                    <BaseGridRoot {...gridProps}>
                        {data?.pages.map((page, i) => (
                            <Fragment key={i}>{renderItems(page.items)}</Fragment>
                        ))}
                        {loading && <Skeletons count={18} />}
                    </BaseGridRoot>
                ) : (
                    <NothingToShow display={nothingToShow} css={{ paddingTop: "4rem" }} />
                )}
            </Row>
        </InfiniteScroll>
    );
}

export default BaseGrid;
