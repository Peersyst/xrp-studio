import { ButtonProps } from "@peersyst/react-components";

export interface ModalFooterProps {
    className?: string;
    style?: React.CSSProperties;
    cancel?: boolean;
    onCancel?: ButtonProps["onClick"];
    cancelLabel?: string;
    isLoading?: boolean;
    mainLabel?: string;
    onSubmit?: ButtonProps["onClick"];
    mainType?: ButtonProps["type"];
    mainDisabled?: boolean;
}
