import { AppBar } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const AppBarRoot = styled(AppBar).attrs({ position: "fixed", elevation: 0 })(
    ({ theme }) => css`
        top: 0;
        left: 0;

        .Toolbar {
            height: var(--appbar-height);
            max-width: 76.75rem;
            margin: 0 auto;
            padding: 0;
        }

        ${theme.breakpoints.down("md")} {
            max-width: unset;
            padding: 0 1rem;
        }
    `,
);
