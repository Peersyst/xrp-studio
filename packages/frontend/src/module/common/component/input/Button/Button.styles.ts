import styled, { css } from "styled-components";
import { Button } from "@peersyst/react-components";
import { ButtonProps } from "module/common/component/input/Button/Button.types";
import { alpha } from "@peersyst/react-utils";

const primaryAppearance = css(
    ({ theme }) => css`
        background-color: ${theme.palette.primary};
        border: 0px;
        color: white;
    `,
);
const secondaryAppearance = css(
    ({ theme }) => css`
        background-color: ${theme.palette.mode === "light" ? theme.palette.black[20] : theme.palette.black[80]}};
        border: 0px;
        color: white;
    `,
);

const outlinedAppearance = css(({ theme }) => {
    const light = theme.palette.mode === "light";
    return css`
        background-color: transparent;
        border: 1px solid ${theme.palette.black[light ? 15 : 75]};
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
        ${buttonAppearances[appearance || "primary"]}
        ${buttonSizes[size || "md"]};
        font-weight: 500;
        text-transform: none;
        &:disabled {
            filter: unset;
            opacity: 0.4;
        }
        &.Loading {
            opacity: 1;
        }
        :active {
            box-shadow: none;
        }
        transition: filter 0.1s;
        &:hover {
            filter: brightness(1.1);
        }
        &:active {
            filter: brightness(0.9);
        }
    `;
});
