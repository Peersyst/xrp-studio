import styled, { css } from "styled-components";
import { IconButton, Modal } from "@peersyst/react-components";

export const ModalRoot = styled(Modal)(
    ({ theme }) => css`
        position: relative;
        padding: 3rem;
        width: 37.5rem;
        max-width: 90vw;
        max-height: 82vh;
        border-radius: ${theme.borderRadiusLg};
        ${theme.breakpoints.down("mobile")} {
            height: auto;
            padding: 2rem;
            .modal-main-col {
                row-gap: 2rem;
            }
            .modal-title {
                font-size: 1.4rem;
            }
        }
    `,
);

export const CloseModalButton = styled(IconButton)(
    ({ theme }) => css`
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 0.75rem;
        svg {
            color: ${theme.palette.text};
        }
    `,
);
