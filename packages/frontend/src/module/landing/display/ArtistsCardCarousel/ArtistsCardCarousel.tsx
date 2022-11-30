import { UserDto } from "module/api/service";
import { InheritedCarouselProps } from "module/common/component/display/Carousel/Carousel.types";
import { ArtistsCardCarouselRoot } from "./ArtistsCardCarousel.styles";
import ArtistCard from "../ArtistCard/ArtistCard";
import ArtistCardSkeleton from "module/landing/feedback/ArtistCardSkeleton/ArtistCardSkeleton";

interface ArtistsCardCarouselProps extends InheritedCarouselProps {
    artists: UserDto[];
}

const ArtistsCardCarousel = ({ artists, skeletonCount = 3, ...rest }: ArtistsCardCarouselProps): JSX.Element => (
    <ArtistsCardCarouselRoot skeletonCount={skeletonCount} Skeleton={ArtistCardSkeleton} {...rest} gap={50}>
        {artists.map((artist, index) => (
            <ArtistCard key={index} artist={artist} />
        ))}
    </ArtistsCardCarouselRoot>
);

export default ArtistsCardCarousel;
