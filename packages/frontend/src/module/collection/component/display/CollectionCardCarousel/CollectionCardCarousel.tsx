import { CollectionDto } from "module/api/service";
import Carousel from "module/common/component/display/Carousel/Carousel";
import CollectionCardSkeleton from "../../feedback/CollectionCardSkeleton/CollectionCardSkeleton";
import CollectionCard from "../CollectionCard/CollectionCard";
import { InheritedCarouselProps } from "module/common/component/display/Carousel/Carousel.types";

interface CollectionCardCarouselProps extends InheritedCarouselProps {
    collections: CollectionDto[];
}

const CollectionCardCarousel = ({ collections, skeletonCount = 3, ...rest }: CollectionCardCarouselProps): JSX.Element => (
    <Carousel skeletonCount={skeletonCount} Skeleton={CollectionCardSkeleton} {...rest}>
        {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
        ))}
    </Carousel>
);

export default CollectionCardCarousel;
