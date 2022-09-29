import styled, { css } from "styled-components";

export const STICKY_HEADER_HEIGHT = "3.5rem";

export const PageHeaderRoot = styled.div`
    display: contents;
`;

export const MainPageHeader = styled.header(
    ({ theme }) => css`
        position: relative;
        --vertical-header-padding: 3rem;
        margin-top: calc(var(--vertical-header-padding) + var(--appbar-height));
        padding-left: var(--horizontal-page-padding);
        padding-right: var(--horizontal-page-padding);
        padding-bottom: var(--vertical-header-padding);
        background-color: ${theme.palette.background};
        width: 100%;
    `,
);

export const PageStickyHeader = styled.header(
    ({ theme }) => css`
        position: fixed;
        top: var(--appbar-height);
        left: 0;
        z-index: ${theme.zIndex.header};

        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: ${STICKY_HEADER_HEIGHT};

        background-color: ${theme.palette.background};

        cursor: pointer;
    `,
);
