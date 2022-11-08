import { UploadInputProps } from "module/common/component/input/UploadInput/UploadInput.types";

export interface ImageInputProps<Multiple extends boolean = false>
    extends Pick<UploadInputProps<Multiple>, Exclude<keyof UploadInputProps, "fileTypes" | "uploadPath" | "children">> {
    alt: string;
    children?: UploadInputProps<Multiple>["children"];
}
