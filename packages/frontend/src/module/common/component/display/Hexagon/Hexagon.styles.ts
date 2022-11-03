import styled, { css } from "styled-components";
import { emphasize } from "@peersyst/react-utils";

export const HexagonRoot = styled.svg.attrs({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
})(
    ({ theme }) => css`
        position: relative;

        color: ${theme.palette.background};

        > path[stroke] {
            stroke: currentColor;
        }

        .Skeleton {
            position: static;
            isolation: initial;

            // Imitate mask (--skeleton-bg: rgba(255, 255, 255, 0.13)) and background
            background-color: ${emphasize(theme.palette.background, 0.13)};

            // Cannot have :before and :after masks as it breaks Hexagon clipping
            &:before,
            &:after {
                display: none;
            }
        }

        .Skeleton > * {
            background-color: currentColor;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    `,
);
