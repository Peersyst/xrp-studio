import { AvatarProps } from "../../display/Avatar/Avatar.types";
import { EditableImageProps } from "../EditableImage/EditableImage.types";

export interface EditableAvatarProps {
    avatarProps: AvatarProps;
    editableImageProps: Omit<EditableImageProps, "imageProps" | "backdrop">;
}
