import useGetUser from "module/user/query/useGetUser";
import {
    ProfileAvatar,
    ProfileCover,
    ProfileHeaderFooter,
    ProfileHeaderRoot,
} from "module/user/component/layout/ProfileHeader/ProfileHeader.styles";
import { Col, Skeleton } from "@peersyst/react-components";
import ProfileInfo from "module/user/component/layout/ProfileHeader/ProfileInfo/ProfileInfo";
import ChipBlockchainAddress from "module/wallet/component/display/ChipBlockchainAddress/ChipBlockchainAddress";
import useIsMobile from "module/common/hook/useIsMobile";

const ProfileHeader = (): JSX.Element => {
    const { data: user, isLoading } = useGetUser();

    const { header = "", image = "", name = "", address = "" } = user || {};
    const isMobile = useIsMobile();

    return (
        <ProfileHeaderRoot showStickyTitle={!!header} image={header} stickyTitle={name}>
            <Col gap="1rem" className="content-profile-header">
                <ProfileCover loading={isLoading} src={header} alt="profile-header" />
                <ProfileHeaderFooter>
                    <ProfileAvatar loading={isLoading} img={image} alt="profile-image" />
                    <ProfileInfo />
                </ProfileHeaderFooter>
            </Col>
            <Skeleton width="134px" loading={isLoading}>
                <ChipBlockchainAddress
                    className="account-address"
                    variant="body2"
                    address={address}
                    type="address"
                    length={isMobile ? 12 : 3}
                />
            </Skeleton>
        </ProfileHeaderRoot>
    );
};

export default ProfileHeader;
