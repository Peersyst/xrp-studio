import { Chip } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const Tag = styled(Chip)(
    ({ theme }) => css`
        &:hover {
            background-color: ${theme.palette.black[80]};
        }
        .Icon {
            font-size: 1.5rem;
        }
    `,
);
