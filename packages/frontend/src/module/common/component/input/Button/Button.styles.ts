import styled, { css } from "styled-components";
import { Button } from "@peersyst/react-components";
import { ButtonProps } from "module/common/component/input/Button/Button.types";
import { alpha } from "@peersyst/react-utils";

const primaryAppearance = css(
    ({ theme }) => css`
        background-color: ${theme.palette.primary};
        color: white;
        &:hover {
            background-color: ${theme.palette.primary};
            opacity: 0.9;
        }
    `,
);
const secondaryAppearance = css(
    ({ theme }) => css`
        background-color: ${theme.palette.mode === "light" ? theme.palette.black[20] : theme.palette.black[80]}};
        color: white;
        &:hover {
            background-color: ${theme.palette.mode === "light" ? theme.palette.black[10] : theme.palette.black[75]}};
        }
    `,
);

const outlinedAppearance = css(({ theme }) => {
    const light = theme.palette.mode === "light";
    return css`
        background-color: transparent;
        border-color: ${theme.palette.black[light ? 15 : 75]};
        color: ${theme.palette.black[30]};
        &:hover {
            background-color: ${alpha(theme.palette.black[light ? 15 : 75], 0.1)};
        }
    `;
});

const buttonAppearances = {
    primary: primaryAppearance,
    secondary: secondaryAppearance,
    outlined: outlinedAppearance,
};

const mdSize = css(
    ({ theme }) => css`
        ${theme.typography.body2.style};
        padding: 0.375rem 0.75rem;
    `,
);

const lgSize = css(
    ({ theme }) => css`
        ${theme.typography.body1.style};
        padding: 0.75rem 1.25rem;
    `,
);

const buttonSizes = {
    md: mdSize,
    lg: lgSize,
};

export const ButtonRoot = styled(Button)<ButtonProps>(({ appearance, size }) => {
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
        ${buttonAppearances[appearance || "primary"]}
        ${buttonSizes[size || "md"]};
    `;
});
