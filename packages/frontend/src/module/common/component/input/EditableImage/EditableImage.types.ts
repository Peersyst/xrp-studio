import { UploadProps } from "@peersyst/react-components";
import { ReactElement } from "react";

export interface EditableImageProps extends Omit<UploadProps, "children"> {
    children: ReactElement;
    updating?: boolean;
    onUpdate?: () => void;
}
