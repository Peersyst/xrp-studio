import styled, { css } from "styled-components";
import { Chip } from "@peersyst/react-components";

export const ChipRoot = styled(Chip)(
    ({ theme }) => css`
        && {
            background-color: ${theme.palette.black["2.5"]};
            opacity: 0.32;
            color: ${theme.palette.black[100]};

            &.ChipLabel {
                color: ${theme.palette.black[100]};
                font-size: 0.875rem;
                padding: 0.375rem 0.75rem;
            }
        }
    `,
);
