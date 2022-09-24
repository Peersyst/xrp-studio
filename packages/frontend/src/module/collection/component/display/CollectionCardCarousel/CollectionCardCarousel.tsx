import { CollectionDto } from "module/api/service";
import Carousel from "module/common/component/display/Carousel/Carousel";
import CollectionCardSkeleton from "../../feedback/CollectionCardSkeleton/CollectionCardSkeleton";
import CollectionCard from "../CollectionCard/CollectionCard";
import { useGetSkeletonCount } from "./useGetSkeletonCount/useGetSkeletonCount";

interface CollectionCardCarouselProps {
    collections: CollectionDto[];
    isLoading: boolean;
    skeletonCount?: number;
}

const CollectionCardCarousel = ({ isLoading, collections, skeletonCount }: CollectionCardCarouselProps): JSX.Element => {
    const defaultSkeletonCount = useGetSkeletonCount();
    return (
        <Carousel>
            {isLoading
                ? [...Array(skeletonCount ?? defaultSkeletonCount)].map((_, i) => <CollectionCardSkeleton key={i} />)
                : collections.map((collection) => <CollectionCard key={collection.id} collection={collection} />)}
        </Carousel>
    );
};

export default CollectionCardCarousel;
