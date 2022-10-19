import { css } from "styled-components";
import { alpha } from "@peersyst/react-utils";

export const DrawerStyles = css(({ theme }) => {
    return css`
        .Drawer {
            border-radius: ${theme.borderRadiusLg};
            background: ${theme.palette.black["90"]};
            border: 1px solid ${alpha(theme.palette.black["0"], 0.2)};
            height: calc(100% - 3rem);
            margin: 1.5rem;
            width: calc(100% - 3rem);
            max-width: 36.75rem;
            ${theme.breakpoints.down("mini")} {
                max-width: 100%;
            }
        }
    `;
});
