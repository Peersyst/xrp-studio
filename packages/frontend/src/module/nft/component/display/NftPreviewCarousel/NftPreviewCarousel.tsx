import { NftPreviewCarouselProps } from "module/nft/component/display/NftPreviewCarousel/NftPreviewCarousel.types";
import Carousel from "module/common/component/display/Carousel/Carousel";
import NftPreview from "module/nft/component/display/NftPreview/NftPreview";
import NftPreviewSkeleton from "../../feedback/NftPreviewSkeleton";

const NftPreviewCarousel = ({ nfts, loading, to, activeId, ...rest }: NftPreviewCarouselProps): JSX.Element => {
    // Prevents to?.(nft) to be evaluated for each NftPreview rendered
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const normalizedToCb = to || ((_) => undefined);

    return (
        <Carousel loading={loading} Skeleton={NftPreviewSkeleton} skeletonCount={7} arrowSize="md" {...rest}>
            {nfts.map((nft, index) => (
                <NftPreview
                    key={index}
                    nft={nft}
                    to={normalizedToCb(nft)}
                    style={{ opacity: activeId !== undefined && activeId !== nft.id ? 0.6 : 1 }}
                />
            ))}
        </Carousel>
    );
};

export default NftPreviewCarousel;
