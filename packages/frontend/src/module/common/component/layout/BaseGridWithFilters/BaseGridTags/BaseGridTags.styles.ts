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
        padding-top: ${GRID_FILTERS_GAP};
        padding-bottom: 1.5rem;
        margin-bottom: 0.25rem;
        // Prevent browser rem rounding gaps between elements
        margin-left: -1px;
        width: calc(100% + 2px);
        z-index: 2;
    `,
);

export const Tag = styled(Chip)(
    ({ theme }) => css`
        .Icon {
            font-size: 1.5rem;
            border-radius: 50%;
            &:hover {
                background-color: ${theme.palette.black[80]};
            }
        }
    `,
);

export const TagCarousel = styled(Carousel)(
    ({ theme }) => css`
        width: unset;
        max-width: 100%;
        ${theme.breakpoints.up("mini")} {
            max-width: calc(100% - 6.8rem);
            .CarouselLeftArrow {
                left: 2.3rem;
            }

            .CarouselRightArrow {
                right: 2.3rem;
            }
        }
    `,
);
