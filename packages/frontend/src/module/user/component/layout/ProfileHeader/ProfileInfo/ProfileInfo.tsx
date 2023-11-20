import useGetUser from "module/user/query/useGetUser";
import { Col, Row, Skeleton, Typography, useDrawer, useTheme } from "@peersyst/react-components";
import { ProfileButtons, ProfileInfoRoot } from "module/user/component/layout/ProfileHeader/ProfileInfo/ProfileInfo.styles";
import Button from "module/common/component/input/Button/Button";
import { useMediaQuery } from "@peersyst/react-hooks";
import useTranslate from "module/common/hook/useTranslate";
import useWallet from "module/wallet/hook//useWallet";
import EditProfileDrawer from "module/user/component/feedback/EditProfileDrawer/EditProfileDrawer";
import SocialButtons from "module/common/component/navigation/SocialButtons/SocialButtons";
import ChipBlockchainAddress from "module/wallet/component/display/ChipBlockchainAddress/ChipBlockchainAddress";
import Username from "module/user/component/Username/Username";
import { EditIcon, VerifiedIcon } from "icons";
import config from "config/config";

const ProfileInfo = (): JSX.Element => {
    const translate = useTranslate();
    const { data: user, isLoading } = useGetUser();
    const { address: walletAddress } = useWallet();
    const { name = "name", address = "", description = "description", discord, twitter, verifiedArtist } = user || {};
    const {
        breakpoints: {
            values: { sm },
        },
    } = useTheme();
    const isSm = useMediaQuery(`(max-width: ${sm}px)`);
    const { showDrawer } = useDrawer();
    const showEditBtn = !isLoading && walletAddress === address;
    const showVerifyBtn = !isLoading && walletAddress === address && !verifiedArtist;

    return (
        <ProfileInfoRoot>
            <Col gap="0.5rem">
                <Row justifyContent="space-between" alignItems="center" gap="0.5rem">
                    <Row flex={1} gap="1rem" alignItems="center" breakpoint={{ width: "mobile", gap: "1rem" }} css={{ overflow: "hidden" }}>
                        <Username
                            name={name}
                            verified={verifiedArtist}
                            loading={isLoading}
                            className="profile-name"
                            variant="h5"
                            fontWeight={800}
                        />
                        <Skeleton width="280px" loading={isLoading}>
                            <ChipBlockchainAddress
                                className="account-address"
                                variant="body1"
                                address={address}
                                type="address"
                                length={isSm ? 3 : "auto"}
                                css={{ width: "auto", flexShrink: 0 }}
                            />
                        </Skeleton>
                    </Row>
                    <ProfileButtons gap="0.5rem">
                        <SocialButtons userId={address} twitterId={twitter} discordId={discord} />
                        {showEditBtn && (
                            <Button size="sm" onClick={() => showDrawer(EditProfileDrawer)} css={{ flexShrink: 0 }}>
                                <EditIcon />
                                {translate("edit")}
                            </Button>
                        )}
                        {showVerifyBtn && (
                            <a css={{ flexShrink: 0 }} href={config.artistVerificationFormLink} target="_blank" rel="noopener noreferrer">
                                <Button size="sm">
                                    <VerifiedIcon />
                                    {translate("verify")}
                                </Button>
                            </a>
                        )}
                    </ProfileButtons>
                </Row>
                <Skeleton width="70%" loading={isLoading}>
                    <Typography className="profile-description" variant="body1" light css={{ wordBreak: "break-word" }}>
                        {description}
                    </Typography>
                </Skeleton>
            </Col>
        </ProfileInfoRoot>
    );
};

export default ProfileInfo;
