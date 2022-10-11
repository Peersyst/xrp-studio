import Avatar from "../../display/Avatar/Avatar";
import { AvatarProps } from "../../display/Avatar/Avatar.types";

const EditableAvatar = ({ ...avatarProps }: AvatarProps): JSX.Element => {
    return <Avatar {...avatarProps} />;
};

export default EditableAvatar;
