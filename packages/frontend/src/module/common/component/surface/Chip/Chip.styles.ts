import styled, { css } from "styled-components";
import { Chip } from "@peersyst/react-components";

export const ChipRoot = styled(Chip)(
    ({ theme }) => css`
        &.Filled {
            radius: 6px;
            background-color: ${theme.palette.black[5]};
            color: ${theme.palette.black[60]};
            font-weight: 500;
            font-size: 0.875rem;
            padding: 0.375rem 0.75rem;
        }
    `,
);
