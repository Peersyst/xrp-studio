import { TFuncKey } from "react-i18next";
import { ToastType } from "@peersyst/react-components";

export class AppError {
    name = "AppError";
    message: TFuncKey<"error">;
    type: ToastType;

    constructor(message: TFuncKey<"error">, type: ToastType = "error") {
        this.message = message;
        this.type = type;
    }
}
