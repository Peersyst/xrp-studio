import styled, { css } from "styled-components";
import { Row } from "@peersyst/react-components";
import { UsernameRootProps } from "./Username.types";

export const UsernameRoot = styled(Row).attrs({ alignItems: "center" })<UsernameRootProps>(({ variant, theme }) => {
    const style = theme.typography[variant !== "inherit" ? variant : "body1"].style;
    const gap = `calc(${style.fontSize || 16} / 4)`;

    return css`
        column-gap: ${gap};
        max-width: 100%;
        overflow: hidden;

        * {
            ${style};
        }
    `;
});
