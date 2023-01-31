import { polling } from "@peersyst/react-utils";
import XrplService from "module/blockchain/service/XrplService/XrplService";

export default function (hash: string): Promise<boolean> {
    return polling(
        () => XrplService.txIsValidated(hash),
        (res) => !res,
    );
}
