import { NftPreviewCarouselProps } from "module/nft/component/display/NftPreviewCarousel/NftPreviewCarousel.types";
import Carousel from "module/common/component/display/Carousel/Carousel";
import NftPreviewSkeleton from "../../feedback/NftPreviewSkeleton";
import { NftPreviewCarouselItem } from "module/nft/component/display/NftPreviewCarousel/NftPreviewCarousel.styles";

const NftPreviewCarousel = ({ nfts, loading, to, activeId, ...rest }: NftPreviewCarouselProps): JSX.Element => {
    // Prevents to?.(nft) to be evaluated for each NftPreview rendered
    const normalizedToCb = to || (() => undefined);

    return (
        <Carousel loading={loading} Skeleton={NftPreviewSkeleton} skeletonCount={7} arrowSize="md" {...rest}>
            {nfts.map((nft, index) => (
                <NftPreviewCarouselItem
                    active={activeId === undefined || activeId === nft.id}
                    isLink={!!to}
                    key={index}
                    nft={nft}
                    to={normalizedToCb(nft)}
                />
            ))}
        </Carousel>
    );
};

export default NftPreviewCarousel;
