import { DropDto } from "module/api/service";
import Carousel from "module/common/component/display/Carousel/Carousel";
import { InheritedCarouselProps } from "module/common/component/display/Carousel/Carousel.types";
import DropCard, { DropCardProps } from "../DropCard/DropCard";
import DropCardSkeleton from "../../feedback/DropCardSkeleton/DropCardSkeleton";

interface DropCardCarouselProps extends InheritedCarouselProps {
    drops: DropDto[];
    size?: DropCardProps["size"];
}

const DropCardCarousel = ({ drops, skeletonCount = 3, size = "lg", ...rest }: DropCardCarouselProps): JSX.Element => (
    <Carousel skeletonCount={skeletonCount} Skeleton={DropCardSkeleton} {...rest}>
        {drops.map((drop) => (
            <DropCard key={drop.id} size={size} drop={drop} />
        ))}
    </Carousel>
);

export default DropCardCarousel;
