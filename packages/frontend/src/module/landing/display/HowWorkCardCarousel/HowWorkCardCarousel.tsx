import { InheritedCarouselProps } from "module/common/component/display/Carousel/Carousel.types";
import { HowWorkCardCarouselRoot } from "./HowWorkCardCarousel.styles";
import { ItemHowWork } from "module/landing/Landing.types";
import HowWorkCard from "../HowWorkCard/HowWorkCard";
import HowWorkCardSkeleton from "module/landing/feedback/HowWorkCardSkeleton/HowWorkCardSkeleton";

interface HowWorkCarouselProps extends InheritedCarouselProps {
    items: ItemHowWork[];
}

const HowWorkCardCarousel = ({ items, skeletonCount = 1, ...rest }: HowWorkCarouselProps): JSX.Element => (
    <HowWorkCardCarouselRoot skeletonCount={skeletonCount} Skeleton={HowWorkCardSkeleton} {...rest}>
        {items.map((item, index) => (
            <HowWorkCard key={index} item={item} />
        ))}
    </HowWorkCardCarouselRoot>
);

export default HowWorkCardCarousel;
