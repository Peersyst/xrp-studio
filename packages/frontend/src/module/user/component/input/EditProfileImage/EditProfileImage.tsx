import EditableAvatar from "module/common/component/input/EditableAvatar/EditableAvatar";
import { cx } from "@peersyst/react-utils";
import useGetWalletUser from "module/user/query/useGetWalletUser";
import { CSSProperties } from "styled-components";

export interface EditProfileImageProps {
    className?: string;
    style?: CSSProperties;
}

const EditProfileImage = ({ className, style }: EditProfileImageProps): JSX.Element => {
    const { data: { image = "" } = {}, isFetching } = useGetWalletUser();
    const handleOnChange = (url: string) => {
        window.alert(url);
    };
    return (
        <EditableAvatar
            editableImageProps={{
                onChange: handleOnChange,
                className: cx("editable-profile-image", className),
                style,
            }}
            avatarProps={{
                img: image,
                alt: "edit-profile-image",
                loading: isFetching,
            }}
        />
    );
};

export default EditProfileImage;
