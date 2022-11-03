import styled, { css } from "styled-components";
import { emphasize } from "@peersyst/react-utils";
import { Col } from "@peersyst/react-components";
import {
    UploadInputPlaceholderRootProps,
    UploadInputPlaceholderVariant,
} from "module/common/component/input/UploadInput/UploadInputPlaceholder/UploadInputPlaceholder.types";

const primaryStyles = css(({ theme }) => {
    const light = theme.palette.mode === "light";
    const color = theme.palette.black[85];

    return css`
        background-color: ${color};
        color: ${theme.palette.black[light ? 40 : 70]};

        &:hover {
            background-color: ${emphasize(color, 0.08)};
        }
    `;
});

const secondaryStyles = css(({ theme }) => {
    const color = theme.palette.black[80];

    return css`
        background-color: ${color};
        color: ${theme.palette.black[40]};

        &:hover {
            background-color: ${emphasize(color, 0.08)};
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
