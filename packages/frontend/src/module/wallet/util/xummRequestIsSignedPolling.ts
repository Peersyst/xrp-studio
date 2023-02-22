import { XummService } from "module/api/service";
import { XummTransactionStatusDto } from "module/api/external-models";
import { AppError } from "../../../query/AppError";
import { TFuncKey } from "react-i18next";
import timeoutPolling from "module/common/util/timeoutPolling";

const XUMM_REQUEST_ERRORS: Record<Exclude<XummTransactionStatusDto["status"], "signed" | "pending">, TFuncKey<"error">> = {
    declined: "xummRequestDeclined",
    cancelled: "xummRequestCancelled",
    expired: "xummRequestExpired",
    "bad-signature": "xummRequestBadSignature",
};

export type Polling<R> = Promise<R> & { abort(): void };

export interface PollingOptions {
    delay?: number;
    maxIterations?: number;
    timeout?: number;
}

export default function (xummRequestUuid: string): Promise<XummTransactionStatusDto | undefined> {
    return timeoutPolling(
        async () => {
            try {
                return await XummService.xummControllerGetStatusByUuid(xummRequestUuid);
            } catch (e) {
                // If an ApiError error occurred return cancelled to inform the user something went wrong with the request
                if (e instanceof AppError) return { status: "cancelled" };
                // If a different error occurred, it will probably mean that a mobile user switched apps
                return {
                    status: "pending",
                };
            }
        },
        (res: XummTransactionStatusDto) => {
            if (res.status === "signed") return false;
            else if (res.status === "pending") return true;
            else throw new AppError(XUMM_REQUEST_ERRORS[res.status]);
        },
    );
}
