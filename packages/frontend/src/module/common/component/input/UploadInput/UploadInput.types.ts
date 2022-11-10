import { CoreFormControlledComponentProps, FormControlledComponentProps, LabelProps, UploadProps } from "@peersyst/react-components";
import { ReactElement, ReactNode } from "react";
import {
    UploadInputPlaceholderProps,
    UploadInputPlaceholderType,
} from "module/common/component/input/UploadInput/UploadInputPlaceholder/UploadInputPlaceholder.types";

export type CoreUploadInputProps<Multiple extends boolean = false> = CoreFormControlledComponentProps<
    (Multiple extends true ? string[] : string) | undefined,
    LabelProps
>;

export type UploadInputLabelHorizontalAlignment = "left" | "center" | "right";
export type UploadInputLabelVerticalAlignment = "top" | "center" | "bottom";

export interface UploadInputLabelAlignment {
    horizontal?: UploadInputLabelHorizontalAlignment;
    vertical?: UploadInputLabelVerticalAlignment;
}

export interface ChangeButtonProps {
    alignment?: UploadInputLabelAlignment;
    label?: boolean | string;
}

/**
 * File types and upload path will have to be improved, as right now, there is a specific path for each file type
 */
export type UploadInputProps<
    Multiple extends boolean = false,
    PT extends UploadInputPlaceholderType = UploadInputPlaceholderType,
> = FormControlledComponentProps<CoreUploadInputProps<Multiple>> & {
    onUpload?: (quantity: number) => void;
    loading?: boolean;
    fileTypes?: UploadProps["fileTypes"];
    uploadPath: string;
    multiple?: Multiple;
    changeButton?: ChangeButtonProps;
    placeholder?: ReactElement | UploadInputPlaceholderProps<PT>;
    children: (url: Multiple extends true ? string[] : string, drag: boolean) => ReactNode;
};

export interface UploadBtnProps {
    alignment?: UploadInputLabelAlignment;
}
