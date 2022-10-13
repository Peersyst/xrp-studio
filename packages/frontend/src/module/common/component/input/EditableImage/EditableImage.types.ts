import { ImageProps, UploadProps } from "@peersyst/react-components";
import { ReactNode } from "react";

export interface EditableImageProps extends Omit<UploadProps, "children" | "value" | "onChange" | "fileTypes" | "multiple"> {
    updating?: boolean;
    loading?: boolean;
    onChange: (file: File) => void;
    imageProps?: ImageProps;
    children?: ReactNode;
}
