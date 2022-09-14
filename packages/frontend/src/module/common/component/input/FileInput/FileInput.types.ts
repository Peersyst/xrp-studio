import { FileInputPlaceholderProps } from "./FileInputPlaceholder/FileInputPlaceholder";
import { CSSProperties } from "react";
import { UploadProps } from "@peersyst/react-components";

export type UploadFileType = File | FileList | undefined;

export interface FileInputProps extends Omit<UploadProps, "onChange" | "multiple"> {
    /**
     * FileInput className
     */
    className?: string;
    /**
     * FileInput style
     * */
    style?: CSSProperties;
    /**
     * Text displaying the files that are supported
     */
    supportedFilesLabel?: FileInputPlaceholderProps["supportedFilesLabel"];
    /**
     * Function when triggered when a file is uploaded
     */
    onChange?: (file: UploadFileType) => void;
    /**
     * Value of the file input
     */
    file?: File | undefined;
    /**
     * Upload default value
     */
    defaultValue?: File | undefined;
}
