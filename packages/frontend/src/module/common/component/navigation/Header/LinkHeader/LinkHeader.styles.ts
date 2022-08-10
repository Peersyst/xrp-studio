import styled, { css } from "styled-components";
import { Typography, TypographyProps } from "@peersyst/react-components";

export const LinkRoot = styled.a(
    () => css`
        margin-top: auto;
        margin-bottom: auto;
    `,
);

export const TypographyRoot = styled(Typography)<TypographyProps>(
    ({ theme }) => css`
        text-decoration: none;
        color: ${theme.palette.black[60]};
        font-weight: 500;
        font-size: 1rem;
    `,
);
