import styled, { css } from "styled-components";

export const BasePageRoot = styled.div(
    ({ theme }) => css`
        margin: 0 auto;
        max-width: var(--page-max-width);
        ${theme.breakpoints.down("md")} {
            max-width: unset;
        }
    `,
);
