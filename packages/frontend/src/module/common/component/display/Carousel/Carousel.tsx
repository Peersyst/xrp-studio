import { Carousel as BaseCarousel, CarouselProps } from "@peersyst/react-components";
import ArrowButton from "../../input/ArrowButton/ArrowButton";

const Carousel = ({ leftArrow, rightArrow, ...rest }: CarouselProps): JSX.Element => {
    return (
        <BaseCarousel
            {...rest}
            leftArrow={leftArrow ?? <ArrowButton direction="left" size="sm" />}
            rightArrow={rightArrow ?? <ArrowButton direction="right" size="sm" />}
        />
    );
};

export default Carousel;
