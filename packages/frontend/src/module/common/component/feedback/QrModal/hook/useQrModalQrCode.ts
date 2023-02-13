import { useTheme } from "@peersyst/react-components";
import QRCode from "easyqrcodejs";
import useIsMobile from "module/common/hook/useIsMobile";
import { useEffect, useRef } from "react";
import { QrModalQr } from "../QrModal.types";

export interface UseQrCodeParams {
    qr: QrModalQr;
    qrId: string;
    enabled: boolean;
}

export default function ({ qr, qrId, enabled }: UseQrCodeParams): void {
    const { palette } = useTheme();
    const isMobile = useIsMobile();
    const qrCode = useRef<QRCode>();

    useEffect(() => {
        if (enabled) {
            const size = isMobile ? 200 : 260;
            if (!qrCode.current)
                qrCode.current = new QRCode(qrId, {
                    ...(qr as { text: string }),
                    colorLight: "transparent",
                    colorDark: palette.text,
                    width: size,
                    height: size,
                });
            else {
                qrCode.current.makeCode((qr as { text: string }).text);
                qrCode.current.resize(size, size);
            }
        }
    }, [qr, isMobile]);
}
