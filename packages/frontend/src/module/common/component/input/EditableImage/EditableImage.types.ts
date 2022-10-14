import { ImageProps, UploadProps } from "@peersyst/react-components";
import { ReactNode } from "react";

export interface EditableImageProps extends Omit<UploadProps, "children" | "value" | "onChange" | "fileTypes" | "multiple"> {
    loading?: boolean;
    onChange: (url: string) => void;
    imageProps?: ImageProps;
    children?: ReactNode;
}
