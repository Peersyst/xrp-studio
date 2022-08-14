import { css, keyframes } from "styled-components";

const backdropBlurEnterKeyframes = keyframes`
    from {
       backdrop-filter: blur(0px)
    }
    to {
        backdrop-filter: blur(16px)
    }
`;

const backdropBlurLeaveKeyframes = keyframes`
    from {
        backdrop-filter: blur(16px);
    }
    to {
        backdrop-filter: blur(0px)
    }
`;

const backdropBlur = css`
    backdrop-filter: blur(16px);
    animation: ${backdropBlurLeaveKeyframes} 400ms;
    &[style="transition-property: background-color; transition-duration: 400ms; transition-delay: 0ms;"] {
        animation: ${backdropBlurEnterKeyframes} 400ms;
    }
`;

export const BackdropStyles = css`
    .Backdrop {
        background-color: rgba(33, 39, 44, 0.72);
        ${backdropBlur}
    },
`;
