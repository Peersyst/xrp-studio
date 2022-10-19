import { AvatarProps } from "../../display/Avatar/Avatar.types";
import { ImageInputProps } from "module/common/component/input/ImageInput/ImageInput.types";

export type AvatarInputProps = Omit<ImageInputProps, "children"> & Pick<AvatarProps, "size">;
