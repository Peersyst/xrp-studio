import styled from "styled-components";
import { Col, Paper, Typography } from "@peersyst/react-components";

export const NftCardRoot = styled(Paper).attrs({ elevation: 0 })`
    position: relative;
    isolation: isolate;

    display: flex;
    flex-direction: column;

    width: 11.67rem;
    height: 15.56rem;
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
    singleLine: true,
})`
    overflow: hidden;
`;

export const NftCardCollectionTypography = styled(Typography).attrs({
    variant: "subtitle1",
    singleLine: true,
})`
    overflow: hidden;
`;

export const NftCardPriceTypography = styled(Typography).attrs({
    variant: "subtitle1",
    singleLine: true,
})`
    overflow: hidden;
`;

export const NftCardFooter = styled(Col).attrs({})`
    padding: 8px 20px;
    background-color: #1b1b1b;
    border-top: 1px solid #1b1b1b;
    color: black;
`;

export const NftCardSlot = styled(Col).attrs({ gap: 6 })``;

export const CardTextTypography = styled(Typography).attrs({ variant: "h3" })``;
