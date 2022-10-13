import { Loader, Upload } from "@peersyst/react-components";
import styled, { css } from "styled-components";
import Button from "../Button/Button";

export const EditableImageRoot = styled(Upload)(
    () => css`
        flex: 1;
        position: relative;
        &.FormControl {
            overflow: hidden;
        }
        &.updating,
        .Upload.Drag {
            img {
                filter: blur(4px);
            }
        }
    `,
);

export const EditableImageLoader = styled(Loader)(
    () => css`
        position: absolute;
        font-size: 1.8rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 150%);
        opacity: 0;
        transition: opacity 100ms, transform 300ms;
        &.updating {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    `,
);

export const UploadBtn = styled(Button)(
    () => css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 1;
        transition: opacity 0.1s ease-in-out;
        &.drag,
        &.updating {
            opacity: 0;
        }
    `,
);
