import Avatar from "../../display/Avatar/Avatar";
import { cx } from "@peersyst/react-utils";
import EditableImage from "../EditableImage/EditableImage";
import { EditableAvatarProps } from "./EditableAvatar.types";
import { useState } from "react";

const EditableAvatar = ({
    avatarProps,
    editableImageProps: { className, onChange, ...restEditableImageProps },
}: EditableAvatarProps): JSX.Element => {
    const { img: imgProp, ...restAvatarProps } = avatarProps || {};
    const [img, setImg] = useState<string>(imgProp);
    const handleOnChange = (img: string) => {
        setImg(img);
        onChange?.(img);
    };
    return (
        <EditableImage onChange={handleOnChange} {...restEditableImageProps} className={cx("editable-avatar", className)}>
            <Avatar {...restAvatarProps} img={img} />
        </EditableImage>
    );
};

export default EditableAvatar;
