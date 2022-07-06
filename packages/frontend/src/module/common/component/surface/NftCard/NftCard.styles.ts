import styled from "styled-components";
import { BackgroundImage, Col, Paper, Typography } from "@peersyst/react-components";

export const NftCardRoot = styled(Paper).attrs({ elevation: 0 })`
    position: relative;
    isolation: isolate;

    display: flex;
    flex-direction: column;

    width: 22rem;
    height: 28rem;
    min-width: 11.67rem;
    min-height: 15.56rem;

    cursor: pointer;
    user-select: none;

    background-color: #0a0a0a;
    outline: 1px solid #1b1b1b;
    overflow: hidden;

    transition: outline 200ms;
    &:hover {
    outline: 1px solid #ffffff;
`;

export const NftCardTitleTypography = styled(Typography).attrs({
    variant: "subtitle1",
    fontWeight: 800,
    fontSize: 16,
    color: "#121212",
    singleLine: true,
})`
    overflow: hidden;
    color: #ffffff;
    height: 26px;
    margin-top: 24px;
    margin-bottom: 8px;
`;

export const NftCardPriceTypography = styled(Typography).attrs({
    variant: "subtitle1",
    fontWeight: 400,
    fontSize: 14,
    singleLine: true,
})`
    overflow: hidden;
    color: #aeb3b7;
    height: 20px;
`;

export const NftCardCollectionTypography = styled(Typography).attrs({
    variant: "subtitle1",
    fontWeight: 400,
    fontSize: 14,
    singleLine: true,
})`
    overflow: hidden;
    color: #aeb3b7;
    background: #21272c;
    height: 32px;
    padding: 6px, 12px, 6px, 12px;
`;

export const NftCardFooter = styled(Col).attrs({})`
    margin-top: 21rem;
    padding: 8px 20px;
    background-color: #1b1b1b;
`;

export const NftBackgroundImg = styled(BackgroundImage)`
    left: 0;
    top: 0;
    background-size: 100%;
    background-position: 30% 0%;
`;

export const NftCardBackground = styled.div`
    position: absolute;
    display: contents;

    > * {
        position: absolute !important;
    }
`;

export const NftCardSlot = styled(Col).attrs({ gap: 6 })``;
