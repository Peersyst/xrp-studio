import { Row, useConfig } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { UserRoutes } from "module/user/UserRouter";
import ShareButton from "../../input/ShareButton/ShareButton";
import { ShareData } from "../../input/ShareButton/ShareButton.types";
import SocialButton from "../../input/SocialButton/SocialButton";
import { SocialButtonsProps } from "./SocialButtons.types";

const SocialButtons = ({ userId, twitterId, discordId }: SocialButtonsProps): JSX.Element => {
    const { twitterLink, discordLink } = useConfig("socialLinks");
    const translate = useTranslate();
    const shareData: ShareData = {
        title: "XRP Studio",
        text: translate("checkoutMyProfile"),
        url: window.location.origin + UserRoutes.USER + userId,
    };

    return (
        <Row gap="0.5rem">
            {twitterId && <SocialButton icon="twitter" link={twitterLink + twitterId} />}
            {discordId && <SocialButton icon="discord" link={discordLink + discordId} />}
            <ShareButton shareData={shareData} />
        </Row>
    );
};

export default SocialButtons;
