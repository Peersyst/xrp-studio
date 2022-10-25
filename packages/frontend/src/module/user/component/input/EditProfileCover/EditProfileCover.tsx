import useGetWalletUser from "module/user/query/useGetWalletUser";
import { UpdateUserFields } from "../../feedback/EditProfileDrawer/EditProfileDrawer";
import { EditProfileCoverRoot } from "./EditProfileCover.styles";
import { EditProfileCoverProps } from "./EditProfileCover.types";

const EditProfileCover = (props: EditProfileCoverProps): JSX.Element => {
    const { data: { header = "loading_header_image" } = {}, isFetching } = useGetWalletUser();

    return (
        <EditProfileCoverRoot
            key={header}
            name={UpdateUserFields.header}
            defaultValue={header}
            alt="header-image"
            className="edit-profile-header"
            loading={isFetching}
            {...props}
        />
    );
};

export default EditProfileCover;
