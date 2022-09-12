import styled, { css }, { css } from "styled-components";

export const BasePageRoot = styled.div(
    ({ theme }) => css`
        margin: 0 auto;
        --horizontal-page-padding: 0;
        max-width: 1120px;

        ${theme.breakpoints.down("md")} {
            max-width: unset;
            --horizontal-page-padding: 5rem;
        }

        ${theme.breakpoints.down("mini")} {
            --horizontal-page-padding: 2rem;
        }
    `,
);
