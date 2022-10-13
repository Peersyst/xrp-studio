import Avatar from "../../display/Avatar/Avatar";
import { EditableImageProps } from "../EditableImage/EditableImage.types";
import { AvatarProps } from "../../display/Avatar/Avatar.types";
import { EditableAvatarRoot } from "./EditableAvatar.styles";
import { cx } from "@peersyst/react-utils";

export interface EditableAvatarProps {
    avatarProps: AvatarProps;
    editableImageProps: Omit<EditableImageProps, "imageProps" | "backdrop">;
}

const EditableAvatar = ({
    avatarProps,
    editableImageProps: { className, ...restEditableImageProps },
}: EditableAvatarProps): JSX.Element => {
    return (
        <EditableAvatarRoot {...restEditableImageProps} className={cx("editable-avatar", className)}>
            <Avatar {...avatarProps} />
        </EditableAvatarRoot>
    );
};

export default EditableAvatar;
