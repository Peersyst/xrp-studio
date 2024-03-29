import { css } from "styled-components";

export const RootStyles = css(
    ({ theme }) => css`
        :root {
            overflow-x: hidden;
            --appbar-height: 6.25rem;
            --page-max-width: 70.5rem;
            --horizontal-page-padding: 0;
            ${theme.breakpoints.down("md")} {
                --horizontal-page-padding: 5rem;
            }
            ${theme.breakpoints.down("mini")} {
                --horizontal-page-padding: 2rem;
            }
        }
    `,
);
