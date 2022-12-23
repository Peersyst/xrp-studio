import { ButtonProps } from "@peersyst/react-components";
import { ReactNode } from "react";

export type SocialMedia = "twitter" | "discord" | "share" | "instagram";

export type SocialButtonIconsType = Record<SocialMedia, JSX.Element>;

export interface SocialButtonProps extends ButtonProps {
    icon: SocialMedia;
    link?: string;
    popover?: ReactNode;
    showOn?: "hover" | "click";
    optionsShare?: ShareData[];
}
