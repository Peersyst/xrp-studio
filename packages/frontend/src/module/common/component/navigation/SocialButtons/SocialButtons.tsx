import { Row, useConfig } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import useIsUserAddress from "module/user/hook/useIsUserAddress";
import { UserRoutes } from "module/user/UserRouter";
import ShareButton from "../../input/ShareButton/ShareButton";
import { ShareData, SocialShareOptions } from "../../input/ShareButton/ShareButton.types";
import SocialButton from "../../input/SocialButton/SocialButton";
import { SocialButtonsProps } from "./SocialButtons.types";

const SocialButtons = ({ userId, twitterId, discordId }: SocialButtonsProps): JSX.Element => {
    const { twitterLink, discordLink } = useConfig("socialLinks");
    const translate = useTranslate();
    const isOwnedProfile = useIsUserAddress();

    const shareData: ShareData = {
        title: "XRP Studio",
        text: translate(isOwnedProfile ? "checkoutMyProfile" : "checkoutThisProfile"),
        url: window.location.origin + UserRoutes.PROFILE.replace(":address", userId),
    };

    return (
        <Row gap="0.5rem">
            {twitterId && <SocialButton icon="twitter" link={twitterLink + twitterId} />}
            {discordId && <SocialButton icon="discord" link={discordLink + discordId} />}
            <ShareButton shareData={shareData} networks={[SocialShareOptions.TWITTER]} />
        </Row>
    );
};

export default SocialButtons;
