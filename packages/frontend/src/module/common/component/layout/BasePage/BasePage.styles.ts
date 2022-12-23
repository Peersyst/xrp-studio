import styled, { css } from "styled-components";

export const BasePageRoot = styled.div(
    ({ theme }) => css`
        margin: 0 auto;
        width: 100%;
        ${theme.breakpoints.down("md")} {
            max-width: unset;
        }
        min-height: 60vh;
    `,
);
