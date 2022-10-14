import { cx } from "@peersyst/react-utils";
import useGetWalletUser from "module/user/query/useGetWalletUser";
import { useNotifyFileEditProfileForm } from "module/user/query/useNotifyFileEditProfileForm";
import { EditProfileCoverRoot } from "./EditProfileCover.styles";
import { EditProfileCoverProps } from "./EditProfileCover.types";

const EditProfileCover = ({ className, style }: EditProfileCoverProps): JSX.Element => {
    const { data: user = { header: "" }, isFetching } = useGetWalletUser();
    const handleOnChange = useNotifyFileEditProfileForm("header", user.header ?? "");

    return (
        <EditProfileCoverRoot
            className={cx("edit-profile-cover", className)}
            style={style}
            loading={isFetching}
            onChange={handleOnChange}
            imageProps={{ src: user.header ?? "", alt: "cover-img", loading: isFetching }}
        />
    );
};

export default EditProfileCover;
