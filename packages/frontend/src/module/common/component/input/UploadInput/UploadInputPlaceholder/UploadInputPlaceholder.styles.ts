import styled, { css } from "styled-components";
import { deemphasize, emphasize } from "@peersyst/react-utils";
import { Col } from "@peersyst/react-components";
import {
    UploadInputPlaceholderRootProps,
    UploadInputPlaceholderVariant,
} from "module/common/component/input/UploadInput/UploadInputPlaceholder/UploadInputPlaceholder.types";

const primaryStyles = css(({ theme }) => {
    const light = theme.palette.mode === "light";
    const bgColor = theme.palette.black[85];
    const color = theme.palette.black[light ? 40 : 70];

    return css`
        background-color: ${bgColor};
        color: ${color};

        &:hover:not(.disabled),
        &.drag {
            background-color: ${emphasize(bgColor, 0.08)};
        }

        &.disabled {
            color: ${deemphasize(color, 0.15)};
            background-color: ${deemphasize(bgColor, 0.15)};
        }
    `;
});

const secondaryStyles = css(({ theme }) => {
    const bgColor = theme.palette.black[80];
    const color = theme.palette.black[40];

    return css`
        background-color: ${bgColor};
        color: ${color};

        &:hover,
        &.drag {
            background-color: ${emphasize(bgColor, 0.08)};
        }

        &.disabled {
            color: ${deemphasize(color, 0.15)};
            background-color: ${deemphasize(bgColor, 0.15)};
        }
    `;
});

const uploadInputPlaceholderVariantStyles: Record<UploadInputPlaceholderVariant, ReturnType<typeof css>> = {
    primary: primaryStyles,
    secondary: secondaryStyles,
};

export const UploadInputPlaceholderRoot = styled(Col).attrs({
    alignItems: "center",
    justifyContent: "center",
    gap: "7.5%",
})<UploadInputPlaceholderRootProps>(
    ({ variant }) => css`
        height: 100%;
        width: 100%;
        padding: 1rem;

        overflow: hidden;

        transition: background-color 200ms linear;

        ${uploadInputPlaceholderVariantStyles[variant]}
    `,
);
