import useGetWalletUser from "module/user/query/useGetWalletUser";
import { EditProfileCoverRoot } from "./EditProfileCover.styles";
import { EditProfileCoverProps } from "./EditProfileCover.types";

const EditProfileCover = (props: EditProfileCoverProps): JSX.Element => {
    const { data: { header } = {}, isFetching } = useGetWalletUser();

    return (
        <EditProfileCoverRoot
            name="header"
            defaultValue={header}
            alt="header-image"
            className="edit-profile-header"
            loading={isFetching}
            {...props}
        />
    );
};

export default EditProfileCover;