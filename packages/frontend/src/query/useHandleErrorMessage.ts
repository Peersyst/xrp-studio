import useTranslate from "module/common/hook/useTranslate";
import { handleErrorMessage } from "./handleErrorMessage";
import { ApiError } from "module/api/service";
import { useToast } from "@peersyst/react-components";

export default function (): (error: ApiError | any) => void {
    const translate = useTranslate("error");
    const { showToast } = useToast();

    return (error) => {
        const { message, type } = handleErrorMessage(error, translate);
        showToast(message, { type });
    };
}
