import { ApiError } from "module/api/service";

export interface HandleApiErrorMessageResult {
    message: string;
    type: "error" | "warning";
}

export function handleErrorMessage(error: ApiError | any, translate: (text: string | string[]) => string): HandleApiErrorMessageResult {
    const code: number = error.body?.statusCode || error.status || error.code || 500;
    const message: string = error.body?.message || error.statusText;

    return {
        message: translate([message, "somethingWentWrong"]),
        type: code >= 400 && code < 500 ? "warning" : "error",
    };
}
