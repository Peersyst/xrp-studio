import styled, { css } from "styled-components";
import ArrowButton from "../../input/ArrowButton/ArrowButton";

export const BackButtonRoot = styled(ArrowButton)(
    ({ theme }) => css`
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
    `,
);
