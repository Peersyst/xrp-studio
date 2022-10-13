import Avatar from "../../display/Avatar/Avatar";
import { cx } from "@peersyst/react-utils";
import EditableImage from "../EditableImage/EditableImage";
import { EditableAvatarProps } from "./EditableAvatar.types";

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
