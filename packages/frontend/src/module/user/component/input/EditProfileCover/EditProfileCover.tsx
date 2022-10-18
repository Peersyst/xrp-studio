import useGetWalletUser from "module/user/query/useGetWalletUser";
import { userEditNames } from "../../feedback/EditProfileDrawer/EditProfileDrawer";
import { EditProfileCoverRoot } from "./EditProfileCover.styles";
import { EditProfileCoverProps } from "./EditProfileCover.types";

const EditProfileCover = (props: EditProfileCoverProps): JSX.Element => {
    const { data: { header } = {}, isFetching, isRefetching } = useGetWalletUser();

    return (
        <EditProfileCoverRoot
            name={userEditNames.header}
            defaultValue={header}
            alt="header-image"
            className="edit-profile-header"
            loading={isFetching && !isRefetching}
            {...props}
        />
    );
};

export default EditProfileCover;
