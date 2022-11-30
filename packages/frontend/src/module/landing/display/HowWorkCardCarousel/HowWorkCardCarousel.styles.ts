import styled, { css } from "styled-components";
import Carousel from "module/common/component/display/Carousel/Carousel";

export const HowWorkCardCarouselRoot = styled(Carousel)(
    ({ theme }) => css`
        width: 60rem;
        margin: auto;
        ${theme.breakpoints.down("sm")} {
            width: 40rem;
        }
        ${theme.breakpoints.down("mobile")} {
            width: 23rem;
        }
    `,
);
