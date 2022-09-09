import { CSSProperties } from "react";

export type SocialMedia = "twitter" | "discord" | "share";

export type SocialButtonIconsType = Record<SocialMedia, JSX.Element>;

export interface SocialButtonProps {
    type: SocialMedia;
    className?: string;
    style?: CSSProperties;
}
