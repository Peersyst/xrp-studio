import styled, { css } from "styled-components";
import { Chip } from "@peersyst/react-components";

export const ChipRoot = styled(Chip)(
    () => css`
        && {
            width: 5.75rem;
            height: 2rem;
            background-color: #141a1f;
            opacity: 0.32;
            color: white;

            &.ChipLabel {
                color: white;
                opacity: 1;
            }
        }
    `,
);
