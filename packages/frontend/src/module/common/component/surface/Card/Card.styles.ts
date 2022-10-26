import { Paper } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const CardRoot = styled(Paper).attrs({ elevation: 0 })(({ theme }) => {
    return css`
        background: ${theme.palette.black["85"]};
        border-radius: ${theme.borderRadiusMd};
    `;
});
