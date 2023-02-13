import styled, { css } from "styled-components";

export const FooterRoot = styled.div`
    position: relative;
`;

export const ContentFooter = styled("div")(
    ({ theme }) => css`
        color: inherit;
        background-color: inherit;
        width: 100%;
        max-width: var(--page-max-width);
        padding: 0 var(--horizontal-page-padding);
        margin: 0 auto;
        .app-link {
            max-width: 15rem;
        }

        ${theme.breakpoints.down("sm")} {
            .ContentFooter {
                flex-direction: column;
                gap: 3rem;
            }
        }
        ${theme.breakpoints.down("mobile")} {
            .app-link {
                max-width: 100%;
            }
        }
    `,
);
