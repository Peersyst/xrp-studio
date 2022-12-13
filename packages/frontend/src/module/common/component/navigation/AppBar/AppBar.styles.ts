import { AppBar, Row } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const AppBarRoot = styled(AppBar).attrs({ position: "fixed", elevation: 0 })(
    () => css`
        top: 0;
        left: 0;

        .Toolbar {
            max-width: var(--page-max-width);
            height: var(--appbar-height);
            margin: 0 auto;
            padding: 0 var(--horizontal-page-padding);
        }
    `,
);

export const AppBarContent = styled(Row)(
    ({ theme }) => css`
        column-gap: 1.5rem;

        ${theme.breakpoints.down("mobile")} {
            column-gap: 0.75rem;
        }
    `,
);
