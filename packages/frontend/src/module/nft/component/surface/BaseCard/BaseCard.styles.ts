import styled, { css } from "styled-components";
import { Col, Image } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";

export const BaseCardRoot = styled(Col).attrs({ gap: "1.5rem" })`
    width: 100%;
    position: relative;
    .skeleton-card {
        min-width: 100%;
        height: auto;
    }
`;

export const BaseCardCover = styled.div(
    ({ theme }) => css`
        position: relative;
        overflow: hidden;

        width: 100%;
        display: flex;

        border-radius: ${theme.borderRadius};

        &:after {
            padding-top: 100%;
            content: "";
            display: block;
        }
    `,
);

export const CoverImage = styled(Image)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

export const RemoveIcon = styled(Button).attrs({ variant: "glass" })(
    () => css`
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        min-width: unset;
        padding: 0.5rem;
        z-index: 1;
    `,
);

export const BaseCardStatus = styled.div`
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
`;
