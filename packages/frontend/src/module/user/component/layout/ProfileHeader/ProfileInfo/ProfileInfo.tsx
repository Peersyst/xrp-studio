import useGetUser from "module/user/query/useGetUser";
import { Col, Row, Skeleton, Typography, useDrawer, useTheme } from "@peersyst/react-components";
import {
    ProfileButtons,
    ProfileInfoRoot,
    ProfileMainInfo,
} from "module/user/component/layout/ProfileHeader/ProfileInfo/ProfileInfo.styles";
import Button from "module/common/component/input/Button/Button";
import { useMediaQuery } from "@peersyst/react-hooks";
import useTranslate from "module/common/hook/useTranslate";
import useWallet from "module/wallet/hook//useWallet";
import EditProfileDrawer from "module/user/component/feedback/EditProfileDrawer/EditProfileDrawer";
import SocialButtons from "module/common/component/navigation/SocialButtons/SocialButtons";
import ChipBlockchainAddress from "module/wallet/component/display/ChipBlockchainAddress/ChipBlockchainAddress";

const ProfileInfo = (): JSX.Element => {
    const translate = useTranslate();
    const { data: user, isLoading } = useGetUser();
    const { address: walletAddress } = useWallet();
    const { name = "name", address = "", description = "description", discord, twitter } = user || {};
    const {
        breakpoints: {
            values: { sm },
        },
    } = useTheme();
    const isSm = useMediaQuery(`(max-width: ${sm}px)`);
    const { showDrawer } = useDrawer();
    const showEditBtn = !isLoading && walletAddress === address;
    return (
        <ProfileInfoRoot>
            <Col flex={1} gap="0.5rem">
                <Row justifyContent="space-between" css={{ maxWidth: "100%" }}>
                    <ProfileMainInfo gap="1rem" alignItems="center" breakpoint={{ width: "mobile", gap: "1rem" }}>
                        <Skeleton width="200px" loading={isLoading}>
                            <Typography className="profile-name" variant="h5" fontWeight={800} singleLine>
                                {name}
                            </Typography>
                        </Skeleton>
                        <Skeleton width="331px" loading={isLoading}>
                            <ChipBlockchainAddress
                                className="account-address"
                                variant="body1"
                                address={address}
                                type="address"
                                length={isSm ? 3 : "auto"}
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
