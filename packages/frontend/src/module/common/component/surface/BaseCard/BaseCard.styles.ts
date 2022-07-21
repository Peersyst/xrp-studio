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
    margin-top: 18rem;
    height: 6.75rem;
    position: absolute;
`;
