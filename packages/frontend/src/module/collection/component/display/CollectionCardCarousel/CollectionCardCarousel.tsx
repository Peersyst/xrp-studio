import { Row } from "@peersyst/react-components";
import { CollectionDto } from "module/api/service";
import Carousel from "module/common/component/display/Carousel/Carousel";
import CollectionCardSkeleton from "../../feedback/CollectionCardSkeleton/CollectionCardSkeleton";
import CollectionCard from "../CollectionCard/CollectionCard";

interface CollectionCardCarouselProps {
    collections: CollectionDto[];
    isLoading: boolean;
    skeletonCount?: number;
}

const CollectionCardCarousel = ({ isLoading, collections, skeletonCount = 3 }: CollectionCardCarouselProps): JSX.Element => {
    return isLoading ? (
        <Row gap={20} css={{ overflow: "hidden" }}>
            {[...Array(skeletonCount)].map((_, i) => (
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
