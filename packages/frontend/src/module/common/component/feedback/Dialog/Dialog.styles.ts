import { Modal, ModalProps } from "@peersyst/react-components";
import styled, { css } from "styled-components";

const DialogPadding = "1.5rem";
const BackdropProps: ModalProps["BackdropProps"] = { style: { padding: DialogPadding, justifyContent: "flex-end" } };

export const DialogRoot = styled(Modal).attrs({
    BackdropProps,
})(({ theme }) => {
    return css`
        height: 100%;
        max-height: unset;
        width: 100%;
        max-width: 36.75rem;
        ${theme.breakpoints.down("mini")} {
            max-width: 100%;
        }
    `;
});
