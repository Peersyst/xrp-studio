import { Typography } from "@peersyst/react-components";
import styled, { css } from "styled-components";
import { greyStyles } from "../FileInput.styles";
import { FileInputPlaceholderLabelProps, FileInputPlaceholderLabelSizeStyles } from "./FileInputPlaceholder.types";

const mdSize = css(
    () => css`
        font-size: 1.25rem;
    `,
);

const smSize = css(
    () => css`
        font-size: 0.875rem;
    `,
);

const sizeStyles: FileInputPlaceholderLabelSizeStyles = {
    md: mdSize,
    sm: smSize,
};

export const FileInputPlaceholderLabel = styled(Typography)<FileInputPlaceholderLabelProps>(
    ({ theme, size }) => css`
        ${greyStyles}
        text-align: center;
        font-weight: 500;
        ${theme.breakpoints.down("mobile")} {
            ${sizeStyles[size]}
        }
    `,
);
