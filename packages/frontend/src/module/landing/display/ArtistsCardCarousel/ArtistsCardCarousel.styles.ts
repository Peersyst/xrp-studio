import styled, { css } from "styled-components";
import Carousel from "module/common/component/display/Carousel/Carousel";

export const ArtistsCardCarouselRoot = styled(Carousel)(
    () => css`
        justify-content: space-between;
        .Skeleton {
            min-width: 10rem;
            max-width: 10rem;
        }
    `,
);
