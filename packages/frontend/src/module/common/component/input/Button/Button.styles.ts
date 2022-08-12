import styled, { css } from "styled-components";
import { Button } from "@peersyst/react-components";
import { ButtonProps } from "module/common/component/input/Button/Button.types";
import { alpha, lighten } from "@peersyst/react-utils";

const primaryAppearance = css(
    ({ theme }) => css`
        background-color: ${theme.palette.primary};
        border: 0px;
        transition: filter 0.1s;
        color: white;
        &:hover {
            filter: brightness(1.1);
        }
        &:active {
            filter: brightness(0.9);
        }
    `,
);
const secondaryAppearance = css(
    ({ theme }) => css`
        background-color: transparent;
        border: 1px solid ${alpha(theme.palette.text, 0.5)};
        transition: all 0.1s;
        &:hover {
            border-color: ${lighten(theme.palette.primary, 0.3)};
            color: ${lighten(theme.palette.primary, 0.3)};
            background-color: ${alpha(theme.palette.primary, 0.2)};
        }
        &:active {
            filter: brightness(0.9);
        }
    `,
);
const buttonAppearances = {
    primary: primaryAppearance,
    secondary: secondaryAppearance,
};

export const ButtonRoot = styled(Button)<ButtonProps>(({ appearance, theme }) => {
    return css`
        ${buttonAppearances[appearance || "primary"]}
        ${theme.typography.body2.style};
        font-weight: 500;
        text-transform: none;
        height: 40px;
        padding: 0 16px;
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
    `;
});
