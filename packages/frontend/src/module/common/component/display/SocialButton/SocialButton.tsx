import { cx } from "@peersyst/react-utils";
import { DiscordIcon, ShareIcon, TwitterIcon } from "icons";
import { SocialButtonRoot } from "./SocialButton.styles";
import { SocialButtonIconsType, SocialButtonProps } from "./SocialButton.types";

const SocialButtonInfo: SocialButtonIconsType = {
    discord: <DiscordIcon />,
    twitter: <TwitterIcon />,
    share: <ShareIcon />,
};

const SocialButton = ({ type, className, style }: SocialButtonProps): JSX.Element => {
    const icon = SocialButtonInfo[type];
    return (
        <SocialButtonRoot style={style} className={cx("social-button", className)} flex={1} justifyContent="center" alignItems="center">
            {icon}
        </SocialButtonRoot>
    );
};

export default SocialButton;
