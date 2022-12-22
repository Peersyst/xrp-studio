import { CSSProperties } from "react";

export interface SocialButtonsProps {
    className?: string;
    style?: CSSProperties;
    userId: string;
    twitterId?: string;
    discordId?: string;
}
