import { Image } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const PublishCoverImage = styled(Image)(
    ({ theme }) => css`
        width: 23rem;
        height: 23rem;
        border-radius: ${theme.borderRadiusMd};
        align-self: center;
        ${theme.breakpoints.down("md")} {
            width: 20rem;
            height: 20rem;
        }
    `,
);
