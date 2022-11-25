import styled, { css } from "styled-components";
import { Image } from "@peersyst/react-components";

export const NftsPreviewListItemImage = styled(Image)(
    ({ theme }) => css`
        max-height: 5rem;
        min-height: 5rem;
        max-width: 5rem;
        min-width: 5rem;
        border-radius: ${theme.borderRadius};
    `,
);
