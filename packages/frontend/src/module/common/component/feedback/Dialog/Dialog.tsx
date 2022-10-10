import { ModalProps } from "@peersyst/react-components";
import { DialogRoot } from "./Dialog.styles";

const Dialog = ({ ...modalProps }: ModalProps): JSX.Element => {
    return <DialogRoot {...modalProps} elevation={0} />;
};

export default Dialog;
