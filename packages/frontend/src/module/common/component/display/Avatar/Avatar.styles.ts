import styled, { css } from "styled-components";

export const AvatarRoot = styled.svg.attrs({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
})(
    ({ theme }) => css`
        color: ${theme.palette.background};

        > path[stroke] {
            stroke: currentColor;
        }

        img,
        .Skeleton {
            background-color: currentColor;
        }

        img {
            position: relative;
            display: block;
        }
    `,
);
