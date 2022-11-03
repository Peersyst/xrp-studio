import { ApiError } from "module/api/service";

export interface HandleApiErrorMessageResult {
    message: string;
    type: "error" | "warning";
}

export function handleErrorMessage(error: ApiError | any, translate: (text: string | string[]) => string): HandleApiErrorMessageResult {
    const code: number = error.body?.statusCode || error.status || error.code || 500;
    const rawMessage = error.body?.message || error.statusText;
    const message = typeof rawMessage === "string" ? rawMessage : "somethingWentWrong";
    const parsedMessage = message.includes(" ")
        ? message
        : message
              .toLowerCase()
              .split("_")
              .map((w) => w.replace(/^./g, (x) => x[0].toUpperCase()))
              .join("")
              .replace(/^./g, (x) => x[0].toLowerCase());

    return {
        message: translate(parsedMessage ? [parsedMessage, "somethingWentWrong"] : "somethingWentWrong"),
        type: code >= 400 && code < 500 ? "warning" : "error",
    };
}
