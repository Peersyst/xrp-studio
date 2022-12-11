import styled, { css } from "styled-components";
import { Typography } from "@peersyst/react-components";
import { alpha } from "@peersyst/react-utils";

export const TypographyRoot = styled(Typography)(
    ({ theme }) => css`
        &:hover {
            color: ${alpha(theme.palette.primary, 0.8)};
        }
    `,
);
