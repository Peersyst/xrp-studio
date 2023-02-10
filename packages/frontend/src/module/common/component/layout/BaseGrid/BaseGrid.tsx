import { InfiniteScroll, Row } from "@peersyst/react-components";
import { BaseGridRoot } from "./BaseGrid.styles";
import { PaginatedData } from "query-utils";
import { BaseGridProps } from "module/common/component/layout/BaseGrid/BaseGrid.types";
import { Fragment } from "react";
import useTranslate from "module/common/hook/useTranslate";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";

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
    cols = 3,
    colGap = "1.5rem",
    rowGap = "1.5rem",
    alignItems,
    justifyContent,
    justifyItems,
    breakpoints,
    nothingToShow,
    className,
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
        className,
    };

    const t = useTranslate("error");

    const finalNothingToShow = nothingToShow || t("nothingToShow");

    return (
        <InfiniteScroll end={!hasItems || end} {...infiniteScrollProps}>
            <Row flex={1}>
                {hasItems ? (
                    <BaseGridRoot {...gridProps}>
                        {data?.pages.map((page, i) => (
                            <Fragment key={i}>{renderItems(page.items)}</Fragment>
                        ))}
                        {loading && <Skeletons count={6} />}
                    </BaseGridRoot>
                ) : typeof finalNothingToShow === "string" ? (
                    <NothingToShow label={finalNothingToShow} css={{ width: "100%", paddingTop: "4rem", height: "12rem" }} />
                ) : (
                    finalNothingToShow
                )}
            </Row>
        </InfiniteScroll>
    );
}

export default BaseGrid;
