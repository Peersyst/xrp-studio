import styled, { css } from "styled-components";
import { Button } from "@peersyst/react-components";
import { ButtonSizeStyle, ButtonVariantStyle } from "module/common/component/input/Button/Button.types";
import { emphasize } from "@peersyst/react-utils";

const primaryVariant = css(
    ({ theme }) => css`
        background-color: ${theme.palette.primary};
        color: white;
        &:hover {
            background-color: ${emphasize(theme.palette.primary, 0.15)};
        }
        &:active {
            background-color: ${emphasize(theme.palette.primary, 0.3)};
        }
    `,
);
const secondaryVariant = css(({ theme }) => {
    const light = theme.palette.mode === "light";
    return css`
        background-color: ${theme.palette.black[light ? 20 : 80]}};
        color: white;
        &:hover {
            background-color: ${emphasize(theme.palette.black[light ? 20 : 80], 0.04)};
        }
        &:active {
            background-color: ${emphasize(theme.palette.black[light ? 20 : 80], 0.08)};
        }
    `;
});

const outlinedVariant = css(({ theme }) => {
    const light = theme.palette.mode === "light";
    return css`
        background-color: transparent;
        border-color: ${theme.palette.black[light ? 50 : 75]};
        color: ${theme.palette.black[30]};
        &:hover {
            color: ${theme.palette.black[30]};
            background-color: ${emphasize(theme.palette.black[light ? 60 : 75], 0.8)};
        }
        &:active {
            color: ${theme.palette.black[30]};
            background-color: ${emphasize(theme.palette.black[light ? 60 : 75], 0.6)};
        }
    `;
});

const textVariant = css(({ theme }) => {
    return css`
        text-transform: none;
        color: ${theme.palette.black[30]};
        padding: 0;
        &:hover {
            color: ${theme.palette.black[10]};
        }
    `;
});

const buttonVariants: ButtonVariantStyle = {
    primary: primaryVariant,
    secondary: secondaryVariant,
    outlined: outlinedVariant,
    text: textVariant,
};

const smSize = css(
    ({ theme }) => css`
        height: 2.375rem;
        ${theme.typography.body2.style};
        padding: 0.375rem 0.875rem;
    `,
);

const mdSize = css(
    ({ theme }) => css`
        height: 2.75rem;
        ${theme.typography.body1.style};
        padding: 0.5rem 0.875rem;
    `,
);

const lgSize = css(
    ({ theme }) => css`
        height: 3.25rem;
        ${theme.typography.body1.style};
        padding: 0.75rem 1.25rem;
    `,
);

const buttonSizes: ButtonSizeStyle = {
    md: mdSize,
    lg: lgSize,
    sm: smSize,
};

export const ButtonRoot = styled(Button)(({ variant, size }) => {
    return css`
        font-weight: 500;
        text-transform: none;
        border: 1px solid transparent;
        transition: background-color 200ms linear, opacity 200ms linear;
        &:disabled {
            opacity: 0.4;
        }
        &.Loading {
            opacity: 1;
        }
        :active {
            box-shadow: none;
        }
        ${buttonSizes[size || "md"]};
        ${buttonVariants[variant || "primary"]}
    `;
});
