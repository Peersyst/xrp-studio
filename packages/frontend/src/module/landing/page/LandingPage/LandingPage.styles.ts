import styled, { css } from "styled-components";

export const LandingPageSectionRoot = styled("div")(
    ({ theme }) => css`
        color: inherit;
        background-color: inherit;
        width: 100%;
        max-width: var(--page-max-width);
        padding: 0 var(--horizontal-page-padding);
        margin: 0 auto;

        ${theme.breakpoints.down("sm")} {
            .ContentPartners {
                flex-direction: column;
                gap: 1rem;
            }
        }
    `,
);
