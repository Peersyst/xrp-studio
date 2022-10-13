import { cx } from "@peersyst/react-utils";
import { EditableImageProps } from "module/common/component/input/EditableImage/EditableImage.types";
import useGetUser from "module/user/query/useGetUser";
import useWallet from "module/wallet/component/hooks/useWallet";
import { useState } from "react";
import { EditProfileCoverRoot } from "./EditProfileCover.styles";

export interface EditProfileCoverProps {
    className?: string;
    style?: EditableImageProps["style"];
}

const EditProfileCover = ({ className, style }: EditProfileCoverProps): JSX.Element => {
    const { address = "rhqTdSsJAaEReRsR27YzddqyGoWTNMhEvC" } = useWallet();
    const { data: { header } = {}, isLoading } = useGetUser(address);

    const [updating, setUpdating] = useState(false);
    const handleFileChange = (file: File) => {
        setUpdating(true);
    };
    return (
        <EditProfileCoverRoot
            className={cx("edit-profile-cover", className)}
            style={style}
            loading={isLoading}
            onChange={handleFileChange}
            updating={updating}
            imageProps={{ src: header, alt: "cover-img", loading: isLoading }}
        />
    );
};

export default EditProfileCover;
