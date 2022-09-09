import { Row } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const SocialButtonRoot = styled(Row)(
    ({ theme }) => css`
        background-color: ${theme.palette.black[85]};
        height: 2.375rem;
        min-width: 2.875rem;
        max-width: 2.875rem;
        border-radius: ${theme.borderRadius};
        cursor: pointer;
        .Icon {
            font-size: 1.3rem;
            color: ${theme.palette.black[0]};
        }
    `,
);
