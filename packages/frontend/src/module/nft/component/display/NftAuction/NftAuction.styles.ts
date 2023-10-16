import { DotIcon } from "icons";
import styled, { css } from "styled-components";

export const Dot = styled(DotIcon)(
    () => css`
        & {
            circle {
                fill: rgb(55, 255, 51) !important;
            }
            font-size: 1.5rem;
        }
    `,
);
