import { Typography } from "@peersyst/react-components";
import styled, { css } from "styled-components";

const greyStyles = css(({ theme }) => {
    const light = theme.palette.mode === "light";
    return css`
        color: ${theme.palette.black[light ? 40 : 70]};
    `;
});

export const FileInputPlaceholderIcon = styled.div(
    ({ theme }) => css`
        ${greyStyles};
        font-size: 9rem;
        ${theme.breakpoints.down("mobile")} {
            font-size: 5.5rem;
        }
    `,
);

export const FileInputPlaceholderLabel = styled(Typography)(
    ({ theme }) => css`
        ${greyStyles}
        text-align: center;
        font-weight: 500;
        ${theme.breakpoints.down("mobile")} {
            &.file-input-label-md {
                font-size: 1.25rem;
            }
            &.file-input-label-sm {
                font-size: 0.875rem;
            }
        }
    `,
);
