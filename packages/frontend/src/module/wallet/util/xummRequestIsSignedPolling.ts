import { polling } from "@peersyst/react-utils";
import { XummService } from "module/api/service";
import { XummTransactionStatusDto } from "module/api/external-models";
import { AppError } from "../../../query/AppError";
import { TFuncKey } from "react-i18next";

const XUMM_REQUEST_ERRORS: Record<Exclude<XummTransactionStatusDto["status"], "signed" | "pending">, TFuncKey<"error">> = {
    declined: "xummRequestDeclined",
    cancelled: "xummRequestCancelled",
    expired: "xummRequestExpired",
    "bad-signature": "xummRequestBadSignature",
};

export default function (xummRequestUuid: string): Promise<XummTransactionStatusDto> {
    return polling(
        () => XummService.xummControllerGetStatusByUuid(xummRequestUuid),
        (res: XummTransactionStatusDto) => {
            if (res.status === "signed") return false;
            else if (res.status === "pending") return true;
            else throw new AppError(XUMM_REQUEST_ERRORS[res.status]);
        },
    );
}
