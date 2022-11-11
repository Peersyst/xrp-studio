import { ReactElement } from "react";
import { Col, Row, Typography } from "@peersyst/react-components";
import { CloseModalButton, ModalRoot } from "module/common/component/feedback/Modal/Modal.styles";
import { ModalProps as BaseModalProps } from "@peersyst/react-components";
import { useControlled } from "@peersyst/react-hooks";
import CloseIcon from "../../../icons/CloseIcon";

export interface PublishModalProps extends Omit<BaseModalProps, "children"> {
    title?: string;
    children: { cover: ReactElement; information: ReactElement; action: ReactElement };
}

const PublishModal = ({
    open: openProp,
    title,
    elevation = 3,
    onClose,
    closable = true,
    children: { cover, information, action },
    ...rest
}: PublishModalProps): JSX.Element => {
    const [open, setOpen] = useControlled(true, openProp, openProp ? onClose : undefined);
    return (
        <ModalRoot open={open} onClose={() => setOpen(false)} elevation={elevation} closable={closable} {...rest}>
            <Col gap="3rem">
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
                <Row gap={4} flex={1}>
                    <Col style={{ width: "50%" }} alignItems="center">
                        {cover}
                    </Col>
                    <Col style={{ width: "50%" }} alignItems="center">
                        {information}
                    </Col>
                </Row>
                {action && (
                    <Row gap={4} justifyContent="center">
                        {action}
                    </Row>
                )}
            </Col>
        </ModalRoot>
    );
};

export default PublishModal;
