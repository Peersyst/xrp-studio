import styled, { css } from "styled-components";
import { Button } from "@peersyst/react-components";
import { ButtonRootProps, ButtonSizeStyle, ButtonVariantStyle } from "module/common/component/input/Button/Button.types";
import { alpha, emphasize } from "@peersyst/react-utils";

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
        background-color: ${theme.palette.black[light ? 20 : 80]};
        color: white;
        &:hover {
            background-color: ${emphasize(theme.palette.black[light ? 20 : 80], 0.04)};
        }
        &:active {
            background-color: ${emphasize(theme.palette.black[light ? 20 : 80], 0.08)};
        }
    `;
});

const tertiaryVariant = css(({ theme }) => {
    const bgColor = theme.palette.black[0];
    return css`
        background-color: ${bgColor};
        color: ${theme.palette.black[80]};
        &:hover {
            background-color: ${emphasize(bgColor, 0.04)};
        }
        &:active {
            background-color: ${emphasize(bgColor, 0.08)};
        }
    `;
});

const outlinedVariant = css<ButtonRootProps>(({ theme, color: colorProp }) => {
    const light = theme.palette.mode === "light";

    const color = colorProp || theme.palette.black[30];
    const hoverColor = colorProp ? emphasize(colorProp, 0.2) : theme.palette.black[light ? 30 : 70];
    const activeColor = colorProp ? emphasize(colorProp, 0.4) : theme.palette.black[light ? 20 : 50];
    const hoverBgColor = colorProp ? emphasize(colorProp, 0.3) : emphasize(theme.palette.black[light ? 60 : 75], 0.8);
    const activeBgColor = colorProp ? emphasize(colorProp, 0.5) : emphasize(theme.palette.black[light ? 60 : 75], 0.6);

    return css`
        background-color: transparent;
        border-color: ${theme.palette.black[light ? 50 : 75]};
        color: ${color};
        &:hover {
            color: ${hoverColor};
            background-color: ${hoverBgColor};
        }
        &:active {
            color: ${activeColor};
            background-color: ${activeBgColor};
        }
    `;
});

const glassVariant = css(({ theme }) => {
    return css`
        background: ${alpha(theme.palette.black[85], 0.72)};
        box-shadow: 0 0 12px ${alpha(theme.palette.black[90], 0.48)};
        backdrop-filter: blur(8px);
        color: ${theme.palette.black[0]};
        &:hover {
            color: ${theme.palette.black[0]};
            box-shadow: 0 0 8px ${alpha(theme.palette.black[90], 0.48)};
            background: ${alpha(theme.palette.black[85], 0.76)};
        }
        &:active {
            color: ${theme.palette.black[0]};
            box-shadow: 0 0 4px ${alpha(theme.palette.black[90], 0.48)};
            background: ${alpha(theme.palette.black[85], 0.9)};
        }
    `;
});

const rainbowVariant = css(() => {
    return css`
        background: linear-gradient(265.96deg, #bd00ff -0.17%, #008cff 54.13%, #00f0ff 99.83%);
        border: unset;
        &:hover {
            opacity: 0.8;
        }
        &:active {
            opacity: 0.6;
        }
    `;
});

const textVariant = css<ButtonRootProps>(({ theme, color: colorProp }) => {
    const color = colorProp || theme.palette.black[30];
    const hoverColor = colorProp ? emphasize(colorProp, 0.2) : theme.palette.black[10];
    const activeColor = colorProp ? emphasize(colorProp, 0.3) : theme.palette.black[5];

    return css`
        text-transform: none;
        color: ${color};
        padding: 0;
        &:hover {
            color: ${hoverColor};
        }
        &:active {
            color: ${activeColor};
        }
    `;
});

const buttonVariants: ButtonVariantStyle = {
    primary: primaryVariant,
    secondary: secondaryVariant,
    tertiary: tertiaryVariant,
    outlined: outlinedVariant,
    text: textVariant,
    glass: glassVariant,
    rainbow: rainbowVariant,
};

const smSize = css(
    ({ theme }) => css`
        height: 2.375rem;
        ${theme.typography.body2.style};
        padding: 0.375rem 0.875rem;
        column-gap: 0.35rem;

        &.Rounded {
            border-radius: 1.1875rem;
        }

        .Icon {
            font-size: 1rem;
        }
    `,
);

const mdSize = css(
    ({ theme }) => css`
        height: 2.75rem;
        ${theme.typography.body1.style};
        padding: 0.5rem 0.875rem;
        column-gap: 0.5rem;

        &.Rounded {
            border-radius: 1.375rem;
        }

        .Icon {
            font-size: 1.5rem;
        }
    `,
);

const lgSize = css(
    ({ theme }) => css`
        height: 3.25rem;
        ${theme.typography.body1.style};
        padding: 0.75rem 1.25rem;
        column-gap: 0.5rem;

        &.Rounded {
            border-radius: 1.625rem;
        }

        .Icon {
            font-size: 1.5rem;
        }
    `,
);

const xlSize = css(
    ({ theme }) => css`
        height: 4.5rem;
        ${theme.typography.h5.style};
        padding: 1.25rem 2rem;
        column-gap: 0.75rem;

        &.Rounded {
            border-radius: ${theme.borderRadius};
        }

        .Icon {
            font-size: 2rem;
        }
    `,
);

const buttonSizes: ButtonSizeStyle = {
    md: mdSize,
    lg: lgSize,
    sm: smSize,
    xl: xlSize,
};

export const ButtonRoot = styled(Button)<ButtonRootProps>(({ variant, size }) => {
    return css`
        font-weight: 500;
        text-transform: none;
        border: 1px solid transparent;
        transition: background-color 200ms linear, opacity 200ms linear, box-shadow 200ms linear, background 200ms linear;
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
