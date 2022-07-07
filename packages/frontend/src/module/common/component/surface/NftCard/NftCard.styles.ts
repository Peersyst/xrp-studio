import styled from "styled-components";
import { Col, Typography } from "@peersyst/react-components";

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
    margin-top: 264px;
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
    height: 26px;
    margin-top: 24px;
    margin-bottom: 8px;
`;

export const NftPriceSlot = styled.div`
    height: 20px;
    margin-bottom: 8px;
`;

export const NftCollectionSlot = styled.div`
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #aeb3b7;
    background: #21272c;
    border-radius: 6px;
`;
