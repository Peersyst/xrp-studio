import { Image } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const NftCoverImage = styled(Image)(
    ({ theme }) => css`
        width: 30rem;
        height: 30rem;
        border-radius: ${theme.borderRadiusMd};
    `,
);
