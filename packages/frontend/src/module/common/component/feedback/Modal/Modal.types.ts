import { ModalProps as BaseModalProps } from "@peersyst/react-components";

export interface ModalRootProps extends BaseModalProps {
    size?: "lg" | "md";
}

export interface ModalProps extends ModalRootProps {
    /**
     * Title of the modal
     */
    title?: string;
    /**
     * Subtitle of the modal
     */
    subtitle?: string;
}
