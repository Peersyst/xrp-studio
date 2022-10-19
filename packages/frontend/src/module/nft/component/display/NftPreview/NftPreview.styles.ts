import styled, { css } from "styled-components";
import { Image } from "@peersyst/react-components";

export const NftPreviewImage = styled(Image)(
    ({ theme }) => css`
        width: 10.25rem;
        height: 10.25rem;
        border-radius: ${theme.borderRadiusMd};
    `,
);
