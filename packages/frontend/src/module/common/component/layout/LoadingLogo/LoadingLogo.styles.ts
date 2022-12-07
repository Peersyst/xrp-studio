import styled, { css } from "styled-components";
import { Image } from "@peersyst/react-components";

export const BaseLoadingPage = styled.div(
    () => css`
        min-width: 100vw;
        max-width: 100vw;
        min-height: 100vh;
        max-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
);

export const LogoImage = styled(Image)(
    () => css`
        width: 20rem;
    `,
);
