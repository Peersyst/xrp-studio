import styled, { css } from "styled-components";
import { Col } from "@peersyst/react-components";

export const BaseCardRoot = styled(Col).attrs({ elevation: 0 })(
    ({ theme }) => css`
        position: relative;
        isolation: isolate;
        display: flex;
        width: 16.5rem;
        height: 23.34rem;
        cursor: pointer;
        background-color: ${theme.palette.black};
        transition: outline 200ms;
    `,
);

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
