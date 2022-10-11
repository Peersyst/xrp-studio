import { ModalProps } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { DialogRoot } from "./Dialog.styles";

const Dialog = ({ className, ...modalProps }: ModalProps): JSX.Element => {
    return <DialogRoot className={cx("Dialog", className)} {...modalProps} elevation={0} />;
};

export default Dialog;
