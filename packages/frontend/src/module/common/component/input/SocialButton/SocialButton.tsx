import { cx } from "@peersyst/react-utils";
import { DiscordIcon, ShareIcon, TwitterIcon } from "icons";
import { SocialButtonRoot } from "./SocialButton.styles";
import { SocialButtonIconsType, SocialButtonProps } from "./SocialButton.types";

const SocialButtonInfo: SocialButtonIconsType = {
    discord: <DiscordIcon />,
    twitter: <TwitterIcon />,
    share: <ShareIcon />,
};

const SocialButton = ({ type, className, style, onClick }: SocialButtonProps): JSX.Element => {
    const icon = SocialButtonInfo[type];
    return (
        <SocialButtonRoot onClick={onClick} style={style} className={cx("social-button", className)}>
            {icon}
        </SocialButtonRoot>
    );
};

export default SocialButton;
