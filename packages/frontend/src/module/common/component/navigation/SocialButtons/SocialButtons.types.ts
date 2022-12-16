import { CSSProperties, ReactNode } from "react";

export interface SocialButtonsProps {
    className?: string;
    style?: CSSProperties;
    userId: string;
    twitterId?: string;
    discordId?: string;
    popover?: ReactNode;
}
