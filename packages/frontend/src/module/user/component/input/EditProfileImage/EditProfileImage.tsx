import useGetWalletUser from "module/user/query/useGetWalletUser";
import { CSSProperties } from "styled-components";
import AvatarInput from "module/common/component/input/AvatarInput/AvatarInput";
import { userEditNames } from "../../feedback/EditProfileDrawer/EditProfileDrawer";

export interface EditProfileImageProps {
    className?: string;
    style?: CSSProperties;
}

const EditProfileImage = (props: EditProfileImageProps): JSX.Element => {
    const { data: { image = "loading_profile_image" } = {}, isFetching, isRefetching } = useGetWalletUser();

    return (
        <AvatarInput
            key={image}
            name={userEditNames.image}
            defaultValue={image}
            size="lg"
            loading={isFetching && !isRefetching}
            alt="profile-image"
            {...props}
        />
    );
};

export default EditProfileImage;
