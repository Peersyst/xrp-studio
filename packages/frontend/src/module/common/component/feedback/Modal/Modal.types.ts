import { ModalProps as BaseModalProps } from "@peersyst/react-components";

export interface ModalProps extends BaseModalProps {
    /**
     * Title of the modal
     */
    title?: string;
    /**
     * Subtitle of the modal
     */
    subtitle?: string;
}
