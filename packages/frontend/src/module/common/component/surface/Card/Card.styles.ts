import { Paper } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const CardRoot = styled(Paper)(({ theme }) => {
    return css`
        background: ${theme.palette.card};
        border-radius: ${theme.borderRadiusMd};
    `;
});
