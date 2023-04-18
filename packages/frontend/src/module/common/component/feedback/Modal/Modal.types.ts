import { ColProps, ModalProps as BaseModalProps } from "@peersyst/react-components";

export type ModalSize = "lg" | "md" | "sm";

export interface ModalRootProps extends BaseModalProps {
    size?: ModalSize;
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
    /**
     * Gap between the title and the content
     */
    gap?: ColProps["gap"];
}
