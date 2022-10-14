import { alpha } from "@peersyst/react-utils";
import { css } from "styled-components";

export const DrawerStyles = css(({ theme }) => {
    return css`
        .Drawer {
            background: ${theme.palette.black["90"]};
            border-radius: ${theme.borderRadiusLg};
            border: 1px solid ${alpha(theme.palette.black["0"], 0.2)};
            height: calc(100% - 1.5rem);
            right: 1.5rem;
        }
    `;
});
