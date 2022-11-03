import { Chip, Row } from "@peersyst/react-components";
import styled, { css } from "styled-components";
import { STICKY_HEADER_HEIGHT } from "module/common/component/layout/PageHeader/PageHeader.styles";
import { GRID_FILTERS_GAP } from "module/common/component/layout/BaseGridWithFilters/BaseGridWithFilters.styles";
import Carousel from "module/common/component/display/Carousel/Carousel";

export const BaseGridTagsRoot = styled(Row).attrs({
    gap: "1rem",
    alignItems: "center",
    wrap: true,
    wrapGap: "1rem",
})(
    ({ theme }) => css`
        box-sizing: content-box;
        min-height: 2.75rem;
        position: sticky;
        top: calc(var(--appbar-height) + ${STICKY_HEADER_HEIGHT});
        background-color: ${theme.palette.background};
        padding: ${GRID_FILTERS_GAP} 0;
        // Prevent browser rem rounding gaps between elements
        margin-left: -1px;
        width: calc(100% + 2px);
    `,
);

export const Tag = styled(Chip)(
    ({ theme }) => css`
        &.Filled:hover {
            background-color: ${theme.palette.black[80]};
        }
        .Icon {
            font-size: 1.5rem;
        }
    `,
);

export const TagCarousel = styled(Carousel)(
    ({ theme }) => css`
        max-width: 100%;
        width: unset;
        ${theme.breakpoints.up("mini")} {
            .CarouselLeftArrow {
                left: 2.3rem;
            }

            .CarouselRightArrow {
                right: 2.3rem;
            }
        }
    `,
);
