import { CoreFormControlledComponentProps, FormControlledComponentProps, LabelProps, UploadProps } from "@peersyst/react-components";
import { ReactNode } from "react";

export type CoreUploadInputProps = CoreFormControlledComponentProps<string | undefined, LabelProps>;

/**
 * File types and upload path will have to be improved, as right now, there is a specific path for each file type
 */
export interface UploadInputProps extends FormControlledComponentProps<CoreUploadInputProps> {
    loading?: boolean;
    fileTypes?: UploadProps["fileTypes"];
    uploadPath: string;
    children: { display: (url: string, drag: boolean) => ReactNode; placeholder?: (drag: boolean) => ReactNode };
}
