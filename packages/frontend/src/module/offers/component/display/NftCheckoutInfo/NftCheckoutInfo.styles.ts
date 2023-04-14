import styled, { css } from "styled-components";
import { Image } from "@peersyst/react-components";

export const NftCheckoutImage = styled(Image)(
    ({ theme }) => css`
        width: 7.5rem;
        height: 7.5rem;
        border-radius: ${theme.borderRadiusMd};
    `,
);
