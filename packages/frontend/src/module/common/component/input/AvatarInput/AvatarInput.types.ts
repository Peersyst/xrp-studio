import { AvatarProps } from "../../display/Avatar/Avatar.types";
import { ImageInputProps } from "module/common/component/input/ImageInput/ImageInput.types";
import { UploadInputPlaceholderVariant } from "module/common/component/input/UploadInput/UploadInputPlaceholder/UploadInputPlaceholder.types";

export type AvatarInputProps = Omit<ImageInputProps, "children" | "placeholder" | "changeButton"> &
    Pick<AvatarProps, "size"> & {
        placeholderVariant?: UploadInputPlaceholderVariant;
    };
