import styled, { css } from "styled-components";
import Carousel from "module/common/component/display/Carousel/Carousel";

export const ArtistsCardCarouselRoot = styled(Carousel)(
    () => css`
        .Skeleton {
            min-width: 16.5rem;
            max-width: 16.5rem;
        }
    `,
);
