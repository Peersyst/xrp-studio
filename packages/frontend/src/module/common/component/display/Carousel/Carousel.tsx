import { Row, useTheme } from "@peersyst/react-components";
import ArrowButton from "../../input/ArrowButton/ArrowButton";
import { CarouselProps } from "./Carousel.types";
import { CarouselRoot } from "module/common/component/display/Carousel/Carousel.styles";
import { useMediaQuery } from "@peersyst/react-hooks";

const Carousel = ({
    arrowSize: arrowSizeProp = "md",
    leftArrow,
    rightArrow,
    gap = 24,
    loading,
    Skeleton,
    skeletonCount = 3,
    className,
    style,
    ...rest
}: CarouselProps): JSX.Element => {
    const { breakpoints } = useTheme();
    const isMd = useMediaQuery(`(max-width: ${breakpoints.values.md}px)`);
    const arrowSize = isMd ? "sm" : arrowSizeProp;

    return loading ? (
        <Row gap={gap} css={{ overflow: "hidden" }} className={className} style={style}>
            {Skeleton && [...Array(skeletonCount)].map((_, i) => <Skeleton key={i} />)}
        </Row>
    ) : (
        <CarouselRoot
            gap={gap}
            leftArrow={leftArrow ?? <ArrowButton direction="left" size={arrowSize} />}
            rightArrow={rightArrow ?? <ArrowButton direction="right" size={arrowSize} />}
            className={className}
            style={style}
            {...rest}
        />
    );
};

export default Carousel;
