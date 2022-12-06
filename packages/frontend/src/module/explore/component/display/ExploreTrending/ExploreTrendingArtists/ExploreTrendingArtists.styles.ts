import styled, { css } from "styled-components";

export const ContentArtistsCardCarousel = styled("div")(
    ({ theme }) => css`
        max-width: var(--page-max-width);
        margin: 0 auto;
        padding: var(--horizontal-page-padding);
        .Carousel {
            max-width: calc(var(--page-max-width) - 14rem);
        }
        ${theme.breakpoints.down("sm")} {
            width: 100%;
            padding: 0;
            max-width: 100%;
        }
    `,
);
