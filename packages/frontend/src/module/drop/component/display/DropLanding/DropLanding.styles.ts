import styled, { css } from "styled-components";
import { Col } from "@peersyst/react-components";
import { DropLandingContentProps, DropLandingRootProps } from "module/drop/component/display/DropLanding/DropLanding.types";

export const DropLandingRoot = styled(Col)<DropLandingRootProps>(
    ({ preview, theme }) => css`
        position: relative;
        overflow: hidden;
        width: 100%;

        ${preview &&
        css`
            border-radius: ${theme.borderRadiusLg};

            pointer-events: none;
        `}
    `,
);

export const DropLandingContent = styled(Col).attrs({ gap: "5.5rem" })<DropLandingContentProps>(
    ({ preview }) => css`
        /*
        Cannot use zoom as it is not an standard css properties
        A workaround will be used, which sets a wrapper that adapts its size to its scaled content
        */
        width: ${document.documentElement.clientWidth}px;
        height: auto;
        background-color: inherit;
        ${preview &&
        css`
            position: absolute;
            top: 0;
            left: 0;
            transform-origin: 0 0;
        `}

        a:hover {
            color: currentColor;

            > .Typography {
                opacity: 0.75;
            }
        }
    `,
);

export const DropLandingSection = styled.div`
    color: inherit;
    background-color: inherit;
    width: 100%;
    max-width: var(--page-max-width);
    padding: 0 var(--horizontal-page-padding);
    margin: 0 auto;
`;
