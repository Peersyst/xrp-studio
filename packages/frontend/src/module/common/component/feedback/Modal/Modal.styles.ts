import styled, { css } from "styled-components";
import { IconButton, Modal } from "@peersyst/react-components";
import { alpha } from "@peersyst/react-utils";

export const ModalRoot = styled(Modal)(
    ({ theme }) => css`
        position: relative;
        padding: 3rem;
        width: 37.5rem;
        max-width: 90vw;
        background: ${theme.palette.black["90"]};
        border-radius: ${theme.borderRadiusLg};
        border: 1px solid ${alpha(theme.palette.black["0"], 0.2)};
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
