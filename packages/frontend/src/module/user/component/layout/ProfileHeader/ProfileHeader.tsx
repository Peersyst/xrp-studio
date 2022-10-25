import useGetUser from "module/user/query/useGetUser";
import {
    ProfileAvatar,
    ProfileCover,
    ProfileHeaderFooter,
    ProfileHeaderRoot,
} from "module/user/component/layout/ProfileHeader/ProfileHeader.styles";
import { BlockchainAddress, Col, Skeleton, Typography } from "@peersyst/react-components";
import ProfileInfo from "module/user/component/layout/ProfileHeader/ProfileInfo/ProfileInfo";

const ProfileHeader = (): JSX.Element => {
    const { data: user, isLoading } = useGetUser();

    const { header, image = "", name = "", address = "", description } = user || {};

    return (
        <ProfileHeaderRoot image={header} stickyTitle={name}>
            <Col gap="1rem">
                <ProfileCover loading={isLoading} src={header} alt="profile-header" />
                <ProfileHeaderFooter>
                    <ProfileAvatar loading={isLoading} img={image} alt="profile-image" />
                    <ProfileInfo />
                </ProfileHeaderFooter>
            </Col>
            <Skeleton width="134px" loading={isLoading}>
                <BlockchainAddress className="account-address" variant="body2" address={address} type="address" length={3} />
            </Skeleton>
            <Skeleton width="90%" loading={isLoading}>
                <Typography className="profile-description" variant="body2" light>
                    {description}
                </Typography>
            </Skeleton>
        </ProfileHeaderRoot>
    );
};

export default ProfileHeader;
