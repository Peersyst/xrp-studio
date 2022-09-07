import { AppBar } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const AppBarRoot = styled(AppBar).attrs({ position: "fixed", elevation: 0 })(
    () => css`
        .Toolbar {
            height: var(--appbar-height);
            margin: 0 auto;
            padding: 0 var(--horizontal-page-padding);
        }
    `,
);
