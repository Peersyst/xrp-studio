import { Popover, Row, Typography } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { DiscordIcon, ShareIcon, TwitterIcon, InstagramIcon } from "icons";
import ShareButtonPopover from "../ShareButton/ShareButtonPopover";
import { SocialButtonRoot } from "./SocialButton.styles";
import { SocialButtonIconsType, SocialButtonProps } from "./SocialButton.types";

const SocialButtonInfo: SocialButtonIconsType = {
    discord: <DiscordIcon />,
    twitter: <TwitterIcon />,
    share: <ShareIcon />,
    instagram: <InstagramIcon />,
};

const SocialButton = ({
    icon: iconProps,
    link,
    className,
    onClick,
    showOn = "hover",
    optionsShare,
    ...rest
}: SocialButtonProps): JSX.Element => {
    const icon = SocialButtonInfo[iconProps];
    const content = (
        <SocialButtonRoot {...rest} onClick={onClick} className={cx("social-button", className)}>
            {icon}
        </SocialButtonRoot>
    );

    return (
        <Popover showOn={showOn} position="top" arrow>
            <Popover.Popper>
                {optionsShare ? (
                    <ShareButtonPopover options={optionsShare} />
                ) : (
                    <Row css={{ padding: "0.25rem 0.35rem" }}>
                        <Typography variant="caption1">{iconProps}</Typography>
                    </Row>
                )}
            </Popover.Popper>
            <Popover.Content>
                {link ? (
                    <a href={link} target="_blank" rel="noopener noreferrer" role="link">
                        {content}
                    </a>
                ) : (
                    content
                )}
            </Popover.Content>
        </Popover>
    );
};

export default SocialButton;
