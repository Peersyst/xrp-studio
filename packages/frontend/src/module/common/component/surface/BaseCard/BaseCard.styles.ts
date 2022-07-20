import styled, { css } from "styled-components";
import { Col, Paper, Typography } from "@peersyst/react-components";

export const BaseCardRoot = styled(Paper).attrs({ elevation: 0 })`
    position: relative;
    isolation: isolate;
    display: flex;
    flex-direction: column;
    width: 16.5rem;
    height: 23.34rem;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    background-color: black;
    transition: outline 200ms;
`;

export const BaseCardFooter = styled(Col)`
    margin-top: 16.5rem;
    height: 6.75rem;
    position: absolute;
`;

export const BaseTitleSlot = styled.div`
    height: 1.63rem;
    margin-top: 1.5rem;
    margin-bottom: 8px;
`;

export const BaseCardTitleTypography = styled(Typography).attrs({
    variant: "subtitle1",
    fontWeight: 800,
    fontSize: 16,
    color: "#121212",
    singleLine: true,
})(
    ({ theme }) => css`
        overflow: hidden;
        color: ${theme.palette.text};
    `,
);
