import { ModalProps } from "module/common/component/feedback/Modal/Modal.types";
import { CloseModalButton, ModalRoot } from "module/common/component/feedback/Modal/Modal.styles";
import { Col, Typography } from "@peersyst/react-components";
import { useControlled } from "@peersyst/react-hooks";
import { CloseIcon } from "icons";

const Modal = ({
    open: openProp,
    title,
    children,
    elevation = 0,
    onClose,
    closable = true,
    subtitle,
    ...rest
}: ModalProps): JSX.Element => {
    const [open, setOpen] = useControlled(true, openProp, openProp ? onClose : undefined);

    return (
        <ModalRoot open={open} elevation={elevation} onClose={() => setOpen(false)} closable={closable} {...rest}>
            <Col gap="3rem">
                {title && (
                    <Col gap="1rem">
                        <Typography variant="h3" fontWeight={700}>
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography variant="body2" fontWeight={400} light>
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
