import { ModalProps } from "@peersyst/react-components";

export interface ConnectXummModalProps extends Omit<ModalProps, "title"> {
    onSignIn?: () => void;
}
