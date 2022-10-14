import EditableAvatar from "module/common/component/input/EditableAvatar/EditableAvatar";
import { cx } from "@peersyst/react-utils";
import { EditableImageProps } from "module/common/component/input/EditableImage/EditableImage.types";
import useGetWalletUser from "module/user/query/useGetWalletUser";
import useUpdateUserFile from "module/user/query/useUpdateUserFile";

export interface EditProfileImageProps {
    className?: string;
    style?: EditableImageProps["style"];
}

const EditProfileImage = ({ className, style }: EditProfileImageProps): JSX.Element => {
    const { data: { image = "" } = {}, isFetching } = useGetWalletUser();
    const { updating, handleFileChange } = useUpdateUserFile();
    const handleOnChange = (file: File) => {
        handleFileChange(file, "image");
    };
    return (
        <EditableAvatar
            editableImageProps={{ onChange: handleOnChange, updating, className: cx("editable-profile-image", className), style }}
            avatarProps={{
                img: image,
                alt: "edit-profile-image",
                loading: isFetching,
            }}
        />
    );
};

export default EditProfileImage;
