import { IconButton } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const ArrowButtonRoot = styled(IconButton)(
    ({ theme }) => css`
        width: 4.5rem;
        height: 4.5rem;
        background-color: ${theme.palette.black[80]};
        color: ${theme.palette.black[0]};
        border-radius: ${theme.borderRadius};
        .Icon {
            font-size: 2.5rem;
            margin: auto;
        }
        ${theme.breakpoints.down("sm")} {
            width: 3rem;
            height: 3rem;
            .Icon {
                font-size: 1.67rem;
                margin: auto;
            }
        }
    `,
);