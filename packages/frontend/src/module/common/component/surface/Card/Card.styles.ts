import { Paper } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const CardRoot = styled(Paper).attrs({ elevation: 0 })(
    ({ theme }) => css`
        background: ${theme.palette.card};
        border-radius: ${theme.borderRadiusMd};
    `,
);
