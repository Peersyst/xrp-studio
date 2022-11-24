import styled, { css } from "styled-components";
import { Image } from "@peersyst/react-components";

export const NftsPreviewListItemImage = styled(Image)(
    ({ theme }) => css`
        height: 5rem;
        width: 5rem;
        border-radius: ${theme.borderRadius};
    `,
);
