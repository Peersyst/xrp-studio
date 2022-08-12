import styled, { css } from "styled-components";
import { PageHeaderProps } from "./PageHeader";

export const PageHeaderRoot = styled.header<PageHeaderProps>(
    ({ theme, withBorder }) => css`
        padding: 3.5rem var(--horizontal-page-padding) 2.5rem var(--horizontal-page-padding);
        background-color: ${theme.palette.background};
        position: fixed;
        top: var(--appbar-height);
        left: 0;
        width: 100%;
        z-index: ${theme.zIndex.header};
        border-bottom: ${withBorder ? "1px solid " + theme.palette.black["80"] : "none"};
    `,
);
