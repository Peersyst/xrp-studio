import { NftPreviewCarouselProps } from "module/nft/component/display/NftPreviewCarousel/NftPreviewCarousel.types";
import Carousel from "module/common/component/display/Carousel/Carousel";
import { NftPreviewCarouselItem } from "module/nft/component/display/NftPreviewCarousel/NftPreviewCarousel.styles";
import useTranslate from "module/common/hook/useTranslate";
import NothingToShow from "module/common/component/feedback/NothingToShow/NothingToShow";
import NftPreviewSkeleton from "../../feedback/NftPreviewSkeleton/NftPreviewSkeleton";
import { useConfig } from "@peersyst/react-components";

const NftPreviewCarousel = ({ nfts, loading, to, activeId, ...rest }: NftPreviewCarouselProps): JSX.Element => {
    // Prevents to?.(nft) to be evaluated for each NftPreview rendered
    const normalizedToCb = to || (() => undefined);
    const translateError = useTranslate("error");
    const defaultPreviewImage = useConfig("nftDefaultCoverUrl");

    return (
        <Carousel loading={loading} Skeleton={NftPreviewSkeleton} skeletonCount={7} arrowSize="md" {...rest}>
            {nfts.length > 0 ? (
                nfts.map((nft, index) => (
                    <NftPreviewCarouselItem
                        active={activeId === undefined || activeId === nft.id}
                        isLink={!!to}
                        key={index}
                        nft={nft}
                        to={normalizedToCb(nft, index)}
                        defaultPreviewUrl={defaultPreviewImage}
                    />
                ))
            ) : (
                <NothingToShow css={{ minHeight: "6rem" }} label={translateError("withoutNftsToShow")} />
            )}
        </Carousel>
    );
};

export default NftPreviewCarousel;
