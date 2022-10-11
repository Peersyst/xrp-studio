import { Loader, Upload } from "@peersyst/react-components";
import styled, { css } from "styled-components";
import Button from "../Button/Button";

export const EditableImageRoot = styled(Upload)(
    () => css`
        flex: 1;
    `,
);

export const EditableImageLoader = styled(Loader)(
    () => css`
        position: absolute;
        z-index: 3;
        font-size: 1.8rem;
        left: 50%;
        transform: translate(-50%, 250%);
        opacity: 0;
        transition: opacity 100ms, transform 300ms;
        &.updating {
            opacity: 1;
            transform: translate(-50%, 120%);
        }
    `,
);

export const UploadBtn = styled(Button)(
    () => css`
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
    `,
);

export const EditableImageBackdrop = styled.div(
    () => css`
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(3px);
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        &.drag,
        &.updating {
            opacity: 1;
        }
    `,
);
