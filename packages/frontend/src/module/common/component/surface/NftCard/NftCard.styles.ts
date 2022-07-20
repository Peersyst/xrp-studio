import styled, { css } from "styled-components";
import { BackgroundImage, Typography } from "@peersyst/react-components";

export const NftCardCollectionTypography = styled(Typography).attrs({
    variant: "subtitle1",
    fontWeight: 400,
    fontSize: 14,
    singleLine: true,
})`
    align-items: center;
    overflow: hidden;
`;

export const NftBackgroundImg = styled(BackgroundImage)`
    left: 0;
    top: 0;
    background-size: 100%;
    background-position: 30% 0%;
    position: absolute;
`;

export const NftCollectionSlot = styled.div(
    ({ theme }) => css`
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: ${theme.palette.grayLight};
        background: ${theme.palette.grayDark};
        border-radius: 6px;
    `,
);
