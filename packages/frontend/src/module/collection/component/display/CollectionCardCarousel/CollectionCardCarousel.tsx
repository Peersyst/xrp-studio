import { Carousel } from "@peersyst/react-components";
import { CollectionDto } from "module/api/service";
import CollectionCardSkeleton from "../../feedback/CollectionCardSkeleton/CollectionCardSkeleton";
import CollectionCard from "../CollectionCard/CollectionCard";

interface CollectionCardCarouselProps {
    collections: CollectionDto[];
    isLoading: boolean;
    skeletonCount?: number;
}

/**
 * It is used 2 carousels because of an edge case.
 * The edge case is when skeletonCount > collections.length and the arrows are shown by default (f.e. ipad)
 * The problem comes when the loading process is finished and the skeletons are replaced with the real cards,
 * bacause the arrows are still shown.
 * Another aproach to fix it, would be to calculte the number of skeletonCount based on screen width
 * with useMediaQuery hook
 */

const CollectionCardCarousel = ({ isLoading, collections, skeletonCount = 3 }: CollectionCardCarouselProps): JSX.Element => {
    return isLoading ? (
        <Carousel>
            {[...Array(skeletonCount)].map((_, i) => (
                <CollectionCardSkeleton key={i} />
            ))}
        </Carousel>
    ) : (
        <Carousel>
            {collections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
            ))}
        </Carousel>
    );
};

export default CollectionCardCarousel;
