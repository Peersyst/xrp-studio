import useGetUser from "module/user/query/useGetUser";
import { Col, Row, Skeleton, Typography, useDrawer } from "@peersyst/react-components";
import {
    ProfileButtons,
    ProfileInfoRoot,
    ProfileMainInfo,
} from "module/user/component/layout/ProfileHeader/ProfileInfo/ProfileInfo.styles";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import useWallet from "module/wallet/hook//useWallet";
import EditProfileDrawer from "module/user/component/feedback/EditProfileDrawer/EditProfileDrawer";
import SocialButtons from "module/common/component/navigation/SocialButtons/SocialButtons";
import ChipBlockchainAddress from "module/wallet/component/display/ChipBlockchainAddress/ChipBlockchainAddress";
import useIsMobile from "module/common/hook/useIsMobile";

const ProfileInfo = (): JSX.Element => {
    const translate = useTranslate();
    const { data: user, isLoading } = useGetUser();
    const { address: walletAddress } = useWallet();
    const { name = "name", address = "", description = "description", discord, twitter } = user || {};
    const isMobile = useIsMobile();
    const { showDrawer } = useDrawer();
    const showEditBtn = !isLoading && walletAddress === address;
    return (
        <ProfileInfoRoot>
            <Col flex={1} gap={isMobile ? "1rem" : "0.5rem"}>
                <Row justifyContent={isMobile ? "center" : "space-between"} css={{ maxWidth: "100%" }}>
                    <ProfileMainInfo gap="1rem" alignItems="center" breakpoint={{ width: "mobile", gap: "1rem" }}>
                        <Skeleton width="200px" loading={isLoading}>
                            <Typography className="profile-name" variant="h5" fontWeight={800} singleLine>
                                {name}
                            </Typography>
                        </Skeleton>
                        <Skeleton width={isMobile ? "331px" : "134px"} loading={isLoading}>
                            <ChipBlockchainAddress
                                className="account-address"
                                variant="body1"
                                address={address}
                                type="address"
                                length={isMobile ? 12 : 3}
                            />
                        </Skeleton>
                    </ProfileMainInfo>
                    <ProfileButtons gap="0.5rem">
                        <SocialButtons userId={address} twitterId={twitter} discordId={discord} />
                        {showEditBtn && (
                            <Button size="sm" onClick={() => showDrawer(EditProfileDrawer)}>
                                {translate("editProfile")}
                            </Button>
                        )}
                    </ProfileButtons>
                </Row>
                <Skeleton width="70%" loading={isLoading}>
                    <Typography className="profile-description" variant="body1" light>
                        {description}
                    </Typography>
                </Skeleton>
            </Col>
        </ProfileInfoRoot>
    );
};

export default ProfileInfo;
