import styled, { css } from "styled-components";
import { IconButton } from "@peersyst/react-components";
import { emphasize } from "@peersyst/react-utils";

export const ThemeButtonRoot = styled(IconButton)(({ theme }) => {
    return css`
        background: ${theme.palette.card};
        color: ${theme.palette.text};
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
            background-color: ${emphasize(theme.palette.card, 0.04)};
        }
        &.Md {
            display: flex;
            width: 3.25rem;
            height: 3.25rem;
            .Icon {
                font-size: 1.5rem;
            }
            ${theme.breakpoints.down("sm")} {
                width: 2.5rem;
                height: 2.5rem;
                .Icon {
                    font-size: 1.15rem;
                }
            }
        }
        &.Sm {
            display: flex;
            width: 1.75rem;
            height: 1.75rem;
            .Icon {
                font-size: 1rem;
            }
        }
    `;
});
