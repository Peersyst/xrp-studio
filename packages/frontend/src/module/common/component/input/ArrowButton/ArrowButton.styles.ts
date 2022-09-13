import { IconButton } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const ArrowButtonRoot = styled(IconButton)(
    ({ theme }) => css`
        background-color: ${theme.palette.black[80]};
        color: ${theme.palette.black[0]};
        border-radius: ${theme.borderRadius};
        display: flex;
        justify-content: center;
        align-items: center;
        &.Lg {
            width: 4.5rem;
            height: 4.5rem;
            .Icon {
                font-size: 2.5rem;
                margin: auto;
            }
            ${theme.breakpoints.down("sm")} {
                width: 3rem;
                height: 3rem;
                .Icon {
                    font-size: 1.67rem;
                }
            }
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
    `,
);
