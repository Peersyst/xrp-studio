import { ModalProps } from "../Modal/Modal.types";

export type QrModalQr = string | { text: string };

export interface QrModalProps extends ModalProps {
    qr: QrModalQr;
    loading?: boolean;
}
