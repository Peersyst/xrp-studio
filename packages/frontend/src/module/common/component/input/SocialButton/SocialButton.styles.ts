import { Button } from "@peersyst/react-components";
import styled, { css } from "styled-components";
import { emphasize } from "@peersyst/react-utils";

export const SocialButtonRoot = styled(Button)(
    ({ theme }) => css`
        background-color: ${theme.palette.black[85]};
        height: 2.375rem;
        min-width: 2.875rem;
        max-width: 2.875rem;
        border-radius: ${theme.borderRadius};
        cursor: pointer;
        &:hover {
            background-color: ${theme.palette.primary};
        }
        &:active {
            background-color: ${emphasize(theme.palette.primary, 0.3)};
        }
        .Icon {
            font-size: 1.3rem;
            color: ${theme.palette.black[0]};
        }
    `,
);
