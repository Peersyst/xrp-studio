import { ReactElement } from "react";
import { Col, Row, Typography } from "@peersyst/react-components";
import { CloseModalButton, ModalRoot } from "module/common/component/feedback/Modal/Modal.styles";
import { ModalProps as BaseModalProps } from "@peersyst/react-components";
import { useControlled } from "@peersyst/react-hooks";
import CloseIcon from "../../../icons/CloseIcon";

export interface PublishModalProps extends Omit<BaseModalProps, "children"> {
    title?: string;
    children: { cover: ReactElement; information: ReactElement };
}

const PublishModal = ({
    open: openProp,
    title,
    elevation = 3,
    onClose,
    closable = true,
    children: { cover, information },
    ...rest
}: PublishModalProps): JSX.Element => {
    const [open, setOpen] = useControlled(true, openProp, openProp ? onClose : undefined);
    return (
        <ModalRoot open={open} onClose={() => setOpen(false)} elevation={elevation} closable={closable} {...rest}>
            <Col gap="3rem" className="modal-main-col">
                {title && (
                    <Col>
                        <Typography variant="h3" fontWeight={700} className="modal-title">
                            {title}
                        </Typography>
                    </Col>
                )}
                {closable && (
                    <CloseModalButton onClick={() => setOpen(false)}>
                        <CloseIcon />
                    </CloseModalButton>
                )}
                <Row gap={4} flex={1} justifyContent="center">
                    <Col>{cover}</Col>
                    <Col>{information}</Col>
                </Row>
            </Col>
        </ModalRoot>
    );
};

export default PublishModal;
