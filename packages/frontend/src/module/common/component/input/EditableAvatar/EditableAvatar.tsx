import Avatar from "../../display/Avatar/Avatar";
import { EditableImageProps } from "../EditableImage/EditableImage.types";
import { AvatarProps } from "../../display/Avatar/Avatar.types";
import { cx } from "@peersyst/react-utils";
import EditableImage from "../EditableImage/EditableImage";

export interface EditableAvatarProps {
    avatarProps: AvatarProps;
    editableImageProps: Omit<EditableImageProps, "imageProps" | "backdrop">;
}

const EditableAvatar = ({
    avatarProps,
    editableImageProps: { className, ...restEditableImageProps },
}: EditableAvatarProps): JSX.Element => {
    return (
        <EditableImage {...restEditableImageProps} className={cx("editable-avatar", className)}>
            <Avatar {...avatarProps} />
        </EditableImage>
    );
};

export default EditableAvatar;
