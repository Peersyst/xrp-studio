import { cx } from "@peersyst/react-utils";
import useGetWalletUser from "module/user/query/useGetWalletUser";
import useUpdateUserFile from "module/user/query/useUpdateUserFile";
import { EditProfileCoverRoot } from "./EditProfileCover.styles";
import { EditProfileCoverProps } from "./EditProfileCover.types";

const EditProfileCover = ({ className, style }: EditProfileCoverProps): JSX.Element => {
    const { data: { header } = {}, isFetching } = useGetWalletUser();
    const { updating, handleFileChange } = useUpdateUserFile();
    const handleOnChange = (file: File) => {
        handleFileChange(file, "header");
    };
    return (
        <EditProfileCoverRoot
            className={cx("edit-profile-cover", className)}
            style={style}
            loading={isFetching}
            onChange={handleOnChange}
            updating={updating}
            imageProps={{ src: header, alt: "cover-img", loading: isFetching }}
        />
    );
};

export default EditProfileCover;
