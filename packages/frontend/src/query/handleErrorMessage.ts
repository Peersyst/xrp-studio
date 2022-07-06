import { ApiError } from "module/api/service";
import { ErrorResourceType } from "locale/i18n.types";

export interface HandleApiErrorMessageResult {
    message: string;
    type: "error" | "warning";
}

export function handleErrorMessage(error: ApiError | any, translate: (text: string | string[]) => string): HandleApiErrorMessageResult {
    const code: number = error.body?.statusCode || error.status || error.code || 500;
    return { message: translate([code.toString() as ErrorResourceType, "somethingWentWrong"]), type: "error" };
}
