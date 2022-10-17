import styled, { css } from "styled-components";
import { Carousel } from "@peersyst/react-components";
import { CarouselRootProps } from "module/common/component/display/Carousel/Carousel.types";

export const CarouselRoot = styled(Carousel)<CarouselRootProps>(
    ({ theme, gap }) => css`
        .CarouselArrow {
            // Override CarrouselArrow's inherited IconButton's opacities on hover/active
            opacity: 1 !important;
        }

        ${theme.breakpoints.up("md")} {
            .CarouselLeftArrow {
                left: -${gap}px;
                transform: translate(-100%, -50%);
            }

            .CarouselRightArrow {
                right: -${gap}px;
                transform: translate(100%, -50%);
            }
        }
    `,
);
