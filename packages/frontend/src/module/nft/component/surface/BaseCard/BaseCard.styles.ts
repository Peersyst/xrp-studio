import styled, { css } from "styled-components";
import { Col } from "@peersyst/react-components";
import { CoverProps } from "./BaseCard.types";

export const BaseCardRoot = styled(Col).attrs({ gap: "1.5rem" })`
    width: 100%;
    .skeleton-card {
        min-width: 100%;
        height: auto;
    }
`;

export const BaseCover = styled.div<CoverProps>(
    ({ theme, imageUrl }) => css`
        border-radius: ${theme.borderRadius};
        background-image: url(${imageUrl});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat; ;
    `,
);

export const BaseCardCoverDefault = styled(BaseCover)<CoverProps>(
    () => css`
        postion: top;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    `,
);

export const BaseCardCover = styled(BaseCover)<CoverProps>(
    () => css`
        width: 100%;
        display: flex;
        postition: relative;
        &:after {
            padding-top: 100%;
            content: "";
            display: block;
        }
    `,
);
