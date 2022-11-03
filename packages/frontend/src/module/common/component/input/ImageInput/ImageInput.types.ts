import { UploadInputProps } from "module/common/component/input/UploadInput/UploadInput.types";

export interface ImageInputProps extends Omit<UploadInputProps, "fileTypes" | "uploadPath" | "children"> {
    alt: string;
    children?: UploadInputProps["children"];
}
