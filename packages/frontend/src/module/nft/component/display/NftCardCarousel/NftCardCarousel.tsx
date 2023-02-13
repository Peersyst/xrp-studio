import { NftDto } from "module/api/service";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import NftCardSkeleton from "module/nft/component/feedback/NftCardSkeleton/NftCardSkeleton";
import { InheritedCarouselProps } from "module/common/component/display/Carousel/Carousel.types";
import { NftCardCarouselRoot } from "module/nft/component/display/NftCardCarousel/NftCardCarousel.styles";

interface NftCardCarouselProps extends InheritedCarouselProps {
    nfts: NftDto[];
    disableLinks?: boolean;
}

const NftCardCarousel = ({ nfts, skeletonCount = 3, disableLinks = false, ...rest }: NftCardCarouselProps): JSX.Element => (
    <NftCardCarouselRoot skeletonCount={skeletonCount} Skeleton={NftCardSkeleton} {...rest}>
        {nfts.map((nft) => (
            <NftCard key={nft.id} nft={nft} link={!disableLinks} />
        ))}
    </NftCardCarouselRoot>
);

export default NftCardCarousel;
