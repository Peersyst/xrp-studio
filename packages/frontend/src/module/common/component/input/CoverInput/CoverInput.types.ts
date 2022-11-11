import { ImageInputProps } from "module/common/component/input/ImageInput/ImageInput.types";
import { UploadInputPlaceholderVariant } from "module/common/component/input/UploadInput/UploadInputPlaceholder/UploadInputPlaceholder.types";

export type CoverInputProps = Omit<ImageInputProps<false>, "children" | "placeholder" | "changeButton" | "multiple"> & {
    placeholderVariant?: UploadInputPlaceholderVariant;
};
