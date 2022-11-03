import styled, { css } from "styled-components";
import { Typography } from "@peersyst/react-components";

export const ExtendedUploadInputPlaceholderLabel = styled(Typography)(() => {
    return css`
        text-align: center;
        font-weight: 500;
        font-size: 1.25rem;
    `;
});

export const ExtendedUploadInputPlaceholderIcon = styled.div(
    () => css`
        font-size: 750%;
    `,
);
