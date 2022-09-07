import styled, { css } from "styled-components";

export const BasePageRoot = styled.div(
    () => css`
        --page-header-height: 5rem;
        --page-content-top-padding: calc(var(--appbar-height) + var(--page-header-height));
    `,
);
