import { Row } from "@peersyst/react-components";
import { CollectionDto } from "module/api/service";
import Carousel from "module/common/component/display/Carousel/Carousel";
import { useMemo } from "react";
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

    return isLoading ? (
        <Row>
            {[...Array(skeletonCount ?? defaultSkeletonCount)].map((_, i) => (
                <CollectionCardSkeleton key={i} />
            ))}
        </Row>
    ) : (
        <Carousel>
            {collections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
            ))}
        </Carousel>
    );
};

export default CollectionCardCarousel;
