import { Paper } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const CardRoot = styled(Paper).attrs({ elevation: 0 })(({ theme }) => {
    const light = theme.palette.mode === "light";
    return css`
        background: ${theme.palette.black[light ? "80" : "85"]};
        border-radius: ${theme.borderRadiusMd};
    `;
});
