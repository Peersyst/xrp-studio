import styled, { css } from "styled-components";

export const BasePageRoot = styled.div(
    ({ theme }) => css`
        margin: 0 auto;
        padding-bottom: 1rem;
        ${theme.breakpoints.down("md")} {
            max-width: unset;
        }
    `,
);
