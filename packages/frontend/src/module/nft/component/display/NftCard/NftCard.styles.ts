import styled, { css } from "styled-components";
import { Image, Row } from "@peersyst/react-components";
import { NftImageProps } from "./NftCard.types";

export const NftImageSkeleton = styled(Image)(
    ({ theme }) => css`
        width: 100%;
        height: 100%;
        border-radius: ${theme.borderRadius};
    `,
);

export const NftImage = styled(Row)<NftImageProps>(
    ({ theme, imageUrl }) => css`
        width: 100%;
        border-radius: ${theme.borderRadius};
        background-image: url(${imageUrl});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-color: ${theme.palette.black[70]};
        &:after {
            padding-top: 100%;
            content: "";
            display: block;
        }
    `,
);
