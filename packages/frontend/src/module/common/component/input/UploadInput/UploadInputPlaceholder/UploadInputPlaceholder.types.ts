import { ExtendedUploadInputPlaceholderProps } from "module/common/component/input/UploadInput/UploadInputPlaceholder/ExtendedUploadInputPlaceholder/ExtendedUploadInputPlaceholder";
import { CompactUploadInputPlaceholderProps } from "module/common/component/input/UploadInput/UploadInputPlaceholder/CompactUploadInputPlaceholder/CompactUploadInputPlaceholder";

export type UploadInputPlaceholderType = "extended" | "compact";
export type UploadInputPlaceholderTypeProps<PT extends UploadInputPlaceholderType> = PT extends "extended"
    ? ExtendedUploadInputPlaceholderProps
    : CompactUploadInputPlaceholderProps;

export type UploadInputPlaceholderVariant = "primary" | "secondary";

export type UploadInputPlaceholderProps<PT extends UploadInputPlaceholderType = UploadInputPlaceholderType> = {
    type?: PT;
    variant?: UploadInputPlaceholderVariant;
} & UploadInputPlaceholderTypeProps<PT>;

export interface UploadInputPlaceholderRootProps {
    variant: UploadInputPlaceholderVariant;
}
