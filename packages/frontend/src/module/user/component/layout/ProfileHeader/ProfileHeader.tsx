import useGetUser from "module/user/query/useGetUser";
import {
    ProfileAvatar,
    ProfileCover,
    ProfileHeaderFooter,
    ProfileHeaderRoot,
} from "module/user/component/layout/ProfileHeader/ProfileHeader.styles";
import { Col } from "@peersyst/react-components";
import ProfileInfo from "module/user/component/layout/ProfileHeader/ProfileInfo/ProfileInfo";

const ProfileHeader = (): JSX.Element => {
    const { data: user, isLoading } = useGetUser();

    const { header = "", image = "", name = "" } = user || {};
    return (
        <ProfileHeaderRoot showStickyTitle={!!header} image={header} stickyTitle={name}>
            <Col gap="1rem" className="content-profile-header">
                <ProfileCover loading={isLoading} src={header} alt="profile-header" />
                <ProfileHeaderFooter>
                    <ProfileAvatar loading={isLoading} img={image} alt="profile-image" />
                    <ProfileInfo />
                </ProfileHeaderFooter>
            </Col>
        </ProfileHeaderRoot>
    );
};

export default ProfileHeader;
