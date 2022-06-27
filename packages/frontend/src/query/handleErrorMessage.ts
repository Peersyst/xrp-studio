import { ApiError } from "module/api/service";
import { TFunction } from "react-i18next";

export interface HandleApiErrorMessageResult {
    message: string;
    type: "error" | "warning";
}

export function handleErrorMessage(error: ApiError | any, translate: TFunction<"translation", undefined>): HandleApiErrorMessageResult {
    const code: number = error.body?.statusCode || error.status || error.code || 500;
    return { message: translate([code.toString(), "somethingWentWrong"], { ns: "error" }), type: "error" };
}
