import { UploadInputProps } from "module/common/component/input/UploadInput/UploadInput.types";
import { Loosen } from "@peersyst/react-types";

export interface ImageInputProps extends Omit<Loosen<UploadInputProps, "children">, "fileTypes" | "uploadPath"> {
    alt: string;
}
