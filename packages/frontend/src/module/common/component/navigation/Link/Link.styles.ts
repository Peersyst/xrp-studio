import styled, { css } from "styled-components";
import { alpha } from "@peersyst/react-utils";

export const LinkRoot = styled.a(
    ({ theme }) => css`
        display: flex;
        text-decoration: none;
        font-weight: 600;

        &:hover {
            color: ${alpha(theme.palette.primary, 0.8)};
        }
    `,
);
