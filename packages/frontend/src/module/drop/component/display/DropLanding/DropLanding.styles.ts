import styled, { css } from "styled-components";
import { Col } from "@peersyst/react-components";
import { DropLandingContentProps } from "module/drop/component/display/DropLanding/DropLanding.types";

export const DropLandingRoot = styled(Col)`
    position: relative;
    overflow: hidden;
`;

export const DropLandingContent = styled(Col)<DropLandingContentProps>(
    ({ preview }) => css`
        /*
        Cannot use zoom as it is not an standard css properties
        A workaround will be used, which sets a wrapper that adapts its size to its scaled content
        */
        width: 100vw;
        height: auto;
        ${preview &&
        css`
            position: absolute;
            top: 0;
            left: 0;
            transform-origin: 0 0;
            transform: scale(0.5);
        `}
    `,
);
