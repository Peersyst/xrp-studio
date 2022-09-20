import { FileInputPlaceholderProps } from "./FileInputPlaceholder/FileInputPlaceholder";
import { UploadProps } from "@peersyst/react-components";

export type FileInputType = File | File[] | undefined;

export type UploadFileType = File | FileList | undefined;

export interface FileInputProps extends Omit<UploadProps, "onChange" | "defaultValue" | "value"> {
    /**
     * Text displaying the files that are supported
     */
    supportedFilesLabel?: FileInputPlaceholderProps["supportedFilesLabel"];
    /**
     * Function when triggered when a file is uploaded
     */
    onChange?: (file: FileInputType) => void;
    /**
     * Value of the file input
     */
    value?: FileInputType;
    /**
     * Upload default value
     */
    defaultValue?: FileInputType;
}
