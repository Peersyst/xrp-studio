import { Animated, InfiniteScroll, Row, TransitionStyles } from "@peersyst/react-components";
import { NftsGridRoot } from "./NftsGrid.styles";
import { PaginatedData } from "query-utils";
import { NftGridProps } from "module/common/component/layout/NftsGrid/NftsGrid.types";
import NftCard from "module/common/component/surface/NftCard/NftCard";
import { NftBackgroundImg } from "module/common/component/surface/NftCard/NftCard.styles";
import img from "../../../../../asset/image/img.png";
import BaseCard from "module/common/component/surface/BaseCard/BaseCard";
import { useState } from "react";

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

function NftsGrid<T extends PaginatedData>({
    loading,
    //children: renderItems,
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
}: NftGridProps<T>): JSX.Element {
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
                <Animated
                    in={false}
                    duration={500}
                    animation={gridAnimation}
                    animatedProperties="transform"
                    hideOnExit={false}
                    style={{ transformOrigin: "100% 0" }}
                >
                    <Row flex={1} justifyContent="center">
                        {hasItems && (
                            <NftsGridRoot {...gridProps}>
                                {data.map((item) => (
                                    <BaseCard id={item.id} type={"nft"} loading={loading}>
                                        <NftCard
                                            title={item.title}
                                            price={item.price}
                                            cover={<NftBackgroundImg src={img} />}
                                            collection={item.collection}
                                        />
                                    </BaseCard>
                                ))}
                                {loading && <Skeletons count={18} />}
                            </NftsGridRoot>
                        )}
                    </Row>
                </Animated>
            </InfiniteScroll>
        </>
    );
}

export default NftsGrid;
