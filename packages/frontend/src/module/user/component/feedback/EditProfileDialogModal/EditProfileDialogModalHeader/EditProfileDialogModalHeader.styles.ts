import { Image } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const EditCoverImage = styled(Image)(
    () => css`
        height: 10.75rem;
        width: 100%;
        border-radius: 0rem;
        width: var(--dialog-max-width);
        max-width: 100%;
    `,
);
