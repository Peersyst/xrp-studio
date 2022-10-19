import { CollectionDto } from "module/api/service";
import Carousel from "module/common/component/display/Carousel/Carousel";
import CollectionCardSkeleton from "../../feedback/CollectionCardSkeleton/CollectionCardSkeleton";
import CollectionCard from "../CollectionCard/CollectionCard";

interface CollectionCardCarouselProps {
    collections: CollectionDto[];
    isLoading: boolean;
    skeletonCount?: number;
}

const CollectionCardCarousel = ({ isLoading, collections, skeletonCount = 3 }: CollectionCardCarouselProps): JSX.Element => (
    <Carousel loading={isLoading} skeletonCount={skeletonCount} Skeleton={CollectionCardSkeleton}>
        {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
        ))}
    </Carousel>
);

export default CollectionCardCarousel;
