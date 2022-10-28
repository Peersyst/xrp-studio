import { Upload } from "@peersyst/react-components";
import styled, { css } from "styled-components";
import Button from "../Button/Button";
import {
    UploadBtnProps,
    UploadInputLabelHorizontalAlignment,
    UploadInputLabelVerticalAlignment,
} from "module/common/component/input/UploadInput/UploadInput.types";

export const UploadInputRoot = styled(Upload)(
    ({ theme }) => css`
        position: relative;

        display: flex;
        flex: 1;
        align-items: center;

        overflow: hidden;

        .Upload {
            display: flex;
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: ${theme.borderRadiusLg};
        }
    `,
);

const UploadButtonTopPos: Record<UploadInputLabelVerticalAlignment, string> = {
    top: "0",
    center: "50%",
    bottom: "100%",
};

const UploadButtonLeftPos: Record<UploadInputLabelHorizontalAlignment, string> = {
    left: "0",
    center: "50%",
    right: "100%",
};

const UploadButtonMarginTop: Record<UploadInputLabelVerticalAlignment, string> = {
    top: "1rem",
    center: "0",
    bottom: "-1rem",
};

const UploadButtonMarginLeft: Record<UploadInputLabelHorizontalAlignment, string> = {
    left: "1rem",
    center: "0",
    right: "-1rem",
};

export const UploadBtn = styled(Button)<UploadBtnProps>(({ alignment }) => {
    const vertical = alignment?.vertical || "center";
    const horizontal = alignment?.horizontal || "center";
    const top = UploadButtonTopPos[vertical];
    const left = UploadButtonLeftPos[horizontal];

    return css`
        position: absolute;
        top: ${top};
        left: ${left};
        margin-top: ${UploadButtonMarginTop[vertical]};
        margin-left: ${UploadButtonMarginLeft[horizontal]};
        transform: translate(-${left}, -${top});
        opacity: 1;
        transition: opacity 0.1s ease-in-out;

        &.drag,
        &.updating {
            opacity: 0;
        }
    `;
});
