import useGetUser from "module/user/query/useGetUser";
import useWallet from "module/wallet/component/hooks/useWallet";
import { useState } from "react";
import EditableAvatar from "module/common/component/input/EditableAvatar/EditableAvatar";
import { cx } from "@peersyst/react-utils";
import { EditableImageProps } from "module/common/component/input/EditableImage/EditableImage.types";

export interface EditableProfileImageProps {
    className?: string;
    style?: EditableImageProps["style"];
}

const EditableProfileImage = ({ className, style }: EditableProfileImageProps): JSX.Element => {
    const { address = "rhqTdSsJAaEReRsR27YzddqyGoWTNMhEvC" } = useWallet();
    const { data: { image = "" } = {}, isLoading } = useGetUser(address);

    const [updating, setUpdating] = useState(false);
    const handleFileChange = (file: File) => {
        setUpdating(true);
    };
    return (
        <EditableAvatar
            editableImageProps={{ onChange: handleFileChange, updating, className: cx("editable-profile-image", className), style }}
            avatarProps={{
                img: image,
                alt: "edit-profile-image",
                loading: isLoading,
            }}
        />
    );
};

export default EditableProfileImage;
