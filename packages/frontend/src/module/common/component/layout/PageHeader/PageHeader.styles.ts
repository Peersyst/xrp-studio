import styled, { css } from "styled-components";

export const PageHeaderRoot = styled.header(
    ({ theme }) => css`
        padding: 3rem var(--horizontal-page-padding);
        background-color: ${theme.palette.background};
        position: fixed;
        top: var(--appbar-height);
        left: 0;
        width: 100%;
        z-index: ${theme.zIndex.header};
    `,
);
