import { Carousel as BaseCarousel, CarouselProps, ChevronLeftIcon, ChevronRightIcon } from "@peersyst/react-components";

const Carousel = ({ leftArrow, rightArrow, ...rest }: CarouselProps): JSX.Element => {
    return <BaseCarousel {...rest} leftArrow={leftArrow ?? <ChevronLeftIcon />} rightArrow={rightArrow ?? <ChevronRightIcon />} />;
};

export default Carousel;
