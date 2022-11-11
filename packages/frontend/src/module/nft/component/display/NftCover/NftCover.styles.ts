import { Image } from "@peersyst/react-components";
import styled, { css } from "styled-components";

export const NftCoverImage = styled(Image)(
    ({ theme }) => css`
        width: 25rem;
        height: 25rem;
        border-radius: ${theme.borderRadiusMd};
    `,
);
