import { alpha } from "@peersyst/react-utils";
import { css } from "styled-components";

export const DrawerStyles = css(({ theme }) => {
    return css`
        .Drawer {
            background: ${theme.palette.black["90"]};
            border-radius: ${theme.borderRadiusLg};
            border: 1px solid ${alpha(theme.palette.black["0"], 0.2)};
            height: calc(100% - 3rem);
            right: 1.5rem;
            width: 100%;
            max-width: 36.75rem;
            ${theme.breakpoints.down("mini")} {
                max-width: 100%;
            }
        }
    `;
});
