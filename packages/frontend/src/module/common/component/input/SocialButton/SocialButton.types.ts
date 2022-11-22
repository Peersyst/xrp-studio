import { ButtonProps } from "@peersyst/react-components";

export type SocialMedia = "twitter" | "discord" | "share" | "instagram";

export type SocialButtonIconsType = Record<SocialMedia, JSX.Element>;

export interface SocialButtonProps extends ButtonProps {
    icon: SocialMedia;
    link?: string;
}
