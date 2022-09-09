import { Row, useConfig } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { UserRoutes } from "module/user/UserRouter";
import { useEffect, useState } from "react";
import SocialButton from "../../input/SocialButton/SocialButton";
import { SocialButtonsProps } from "./SocialButtons.types";

const SocialButtons = ({ userId, twitterId, discordId }: SocialButtonsProps): JSX.Element => {
    const [canShare, setCanShare] = useState(false);
    const { twitterLink, discordLink } = useConfig("socialLinks");
    const translate = useTranslate();
    const shareData = {
        title: "XRP Studio",
        text: translate("checkoutMyProfile"),
        url: window.location.origin + UserRoutes.USER + userId,
    };
    useEffect(() => {
        try {
            if (window.navigator && window.navigator.canShare && window.navigator.canShare(shareData)) {
                setCanShare(true);
            }
        } catch (e) {}
    }, []);
    const shareProfileLink = async () => {
        try {
            await window.navigator.share(shareData);
        } catch (e) {}
    };
    return (
        <Row gap="0.5rem">
            {twitterId && (
                <a href={twitterLink + twitterId} target="_blank" rel="noopener noreferrer" role="link">
                    <SocialButton type="twitter" />
                </a>
            )}
            {discordId && (
                <a href={discordLink + discordId} target="_blank" rel="noopener noreferrer" role="link">
                    <SocialButton type="discord" />
                </a>
            )}
            {canShare && <SocialButton type="share" onClick={shareProfileLink} role="button" />}
        </Row>
    );
};

export default SocialButtons;
