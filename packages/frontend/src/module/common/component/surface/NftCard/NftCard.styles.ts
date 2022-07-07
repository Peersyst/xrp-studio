import styled from "styled-components";
import { BackgroundImage, Col, Typography } from "@peersyst/react-components";

export const NftCardTitleTypography = styled(Typography).attrs({
    variant: "subtitle1",
    fontWeight: 800,
    fontSize: 16,
    color: "#121212",
    singleLine: true,
})`
    overflow: hidden;
    color: #ffffff;
`;

export const NftCardPriceTypography = styled(Typography).attrs({
    variant: "subtitle1",
    fontWeight: 400,
    fontSize: 14,
    singleLine: true,
})`
    overflow: hidden;
    color: #aeb3b7;
`;

export const NftCardCollectionTypography = styled(Typography).attrs({
    variant: "subtitle1",
    fontWeight: 400,
    fontSize: 14,
    singleLine: true,
})`
    align-items: center;
    overflow: hidden;
`;

export const NftCardFooter = styled(Col).attrs({})`
    margin-top: 16.5rem;
    height: 6.75rem;
    position: absolute;
`;

export const NftBackgroundImg = styled(BackgroundImage)`
    left: 0;
    top: 0;
    background-size: 100%;
    background-position: 30% 0%;
    position: absolute;
`;

export const NftCardBackground = styled.div`
    position: absolute;
    display: contents;

    > * {
        position: absolute !important;
    }
`;

export const NftTitleSlot = styled.div`
    height: 1.63rem;
    margin-top: 1.5rem;
    margin-bottom: 8px;
`;

export const NftPriceSlot = styled.div`
    height: 1.25rem;
    margin-bottom: 8px;
`;

export const NftCollectionSlot = styled.div`
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #aeb3b7;
    background: #21272c;
    border-radius: 6px;
`;
