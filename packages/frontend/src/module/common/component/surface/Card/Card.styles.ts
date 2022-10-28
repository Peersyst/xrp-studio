import { Paper } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const CardRoot = styled(Paper).attrs({ elevation: 0 })(({ theme }) => {
    const backgroundColor = theme.palette.mode === "light" ? theme.palette.background : theme.palette.black["85"];
    return css`
        background: ${backgroundColor};
        border-radius: ${theme.borderRadiusMd};
    `;
});
