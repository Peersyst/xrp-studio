import { Modal, ModalProps } from "@peersyst/react-components";
import styled, { css } from "styled-components";

const DialogPadding = "1.5rem";
const BackdropProps: ModalProps["BackdropProps"] = { style: { padding: DialogPadding, justifyContent: "flex-end" } };

export const DialogRoot = styled(Modal).attrs({
    BackdropProps,
})(({ theme }) => {
    return css`
        --dialog-max-width: 36.75rem;
        height: 100%;
        max-height: unset;
        width: 100%;
        max-width: var(--dialog-max-width);
        ${theme.breakpoints.down("mini")} {
            max-width: 100%;
        }
    `;
});
