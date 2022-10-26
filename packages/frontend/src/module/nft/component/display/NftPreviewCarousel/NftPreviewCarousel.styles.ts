import styled, { css } from "styled-components";
import NftPreview from "module/nft/component/display/NftPreview/NftPreview";
import { NftPreviewCarouselItemProps } from "module/nft/component/display/NftPreviewCarousel/NftPreviewCarousel.types";

export const NftPreviewCarouselItem = styled(NftPreview)<NftPreviewCarouselItemProps>(
    ({ active, isLink }) => css`
        opacity: ${active ? 1 : 0.6};

        transition: opacity 200ms;

        ${isLink &&
        !active &&
        css`
            &:hover {
                opacity: 0.8;
            }
        `}
    `,
);
