import styled, { css } from "styled-components";

export const BasePageRoot = styled.div(
    ({ theme }) => css`
        --horizontal-page-padding: 9.75rem;
        --page-header-height: 5rem;
        --page-content-top-padding: calc(var(--appbar-height) + var(--page-header-height));
        ${theme.breakpoints.between("sm", "md")} {
            --horizontal-page-padding: 7rem;
        }
        ${theme.breakpoints.down("sm")} {
            --horizontal-page-padding: 4rem;
        }
    `,
);
