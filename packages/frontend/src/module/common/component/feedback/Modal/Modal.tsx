import { ModalProps } from "module/common/component/feedback/Modal/Modal.types";
import { CloseModalButton, ModalRoot } from "module/common/component/feedback/Modal/Modal.styles";
import { Col, Typography } from "@peersyst/react-components";
import { useControlled } from "@peersyst/react-hooks";
import CloseIcon from "module/common/icons/CloseIcon";

const Modal = ({
    open: openProp,
    title,
    children,
    elevation = 3,
    onClose,
    closable = true,
    subtitle,
    ...rest
}: ModalProps): JSX.Element => {
    const [open, setOpen] = useControlled(true, openProp, openProp ? onClose : undefined);
    return (
        <ModalRoot open={open} onClose={() => setOpen(false)} elevation={elevation} closable={closable} {...rest}>
            <Col gap="3rem" className="modal-main-col">
                {title && (
                    <Col gap="1rem">
                        <Typography variant="h3" fontWeight={700} className="modal-title">
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography variant="body2" light>
                                {subtitle}
                            </Typography>
                        )}
                    </Col>
                )}
                {closable && (
                    <CloseModalButton onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </CloseModalButton>
                )}
                {children}
            </Col>
        </ModalRoot>
    );
};

export default Modal;
