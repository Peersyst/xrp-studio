import { ApiError } from "module/api/service";
import { AppError } from "./AppError";
import { TFuncKey, TFunction } from "react-i18next";
import { ToastType } from "@peersyst/react-components";

export interface HandleApiErrorMessageResult {
    message: string;
    type: ToastType;
}

export function handleErrorMessage(error: AppError | ApiError | any, translate: TFunction<"error">): HandleApiErrorMessageResult {
    let resultMsg: string;
    let resultType: ToastType;
    if (error.name === "ApiError") {
        const code: number = error.body?.statusCode || error.status || error.code || 500;
        if (code === 401) return { message: translate("yourSessionHasExpired"), type: "warning" };
        const rawMessage = error.message || error.body?.message || error.statusText;
        const message = typeof rawMessage === "string" ? rawMessage : "somethingWentWrong";
        const parsedMessage = message.includes(" ")
            ? message
            : message
                  .toLowerCase()
                  .split("_")
                  .map((w) => w.replace(/^./g, (x) => x[0].toUpperCase()))
                  .join("")
                  .replace(/^./g, (x) => x[0].toLowerCase());
        resultMsg = translate(
            parsedMessage ? ([parsedMessage, "somethingWentWrong"] as TFuncKey<"error"> | TFuncKey<"error">[]) : "somethingWentWrong",
        );
        resultType = code >= 400 && code < 500 ? "warning" : "error";
    } else if (error.name === "AppError") {
        resultMsg = translate(error.message);
        resultType = error.type;
    } else {
        resultMsg = translate(typeof error === "string" ? [error as TFuncKey<"error">, "somethingWentWrong"] : "somethingWentWrong");
        resultType = "error";
    }
    return {
        message: resultMsg,
        type: resultType,
    };
}
