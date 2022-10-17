import { alpha } from "@peersyst/react-utils";
import { css } from "styled-components";

export const ModalStyles = css(({ theme }) => {
    return css`
        .Modal {
            background: ${theme.palette.black["90"]};
            border: 1px solid ${alpha(theme.palette.black["0"], 0.2)};
        }
    `;
});
