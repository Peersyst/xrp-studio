import styled, { css } from "styled-components";
import { Image } from "@peersyst/react-components";

export const NftImage = styled(Image)(
    ({ theme }) => css`
        width: 100%;
        height: 100%;
        border-radius: ${theme.borderRadius};
    `,
);
