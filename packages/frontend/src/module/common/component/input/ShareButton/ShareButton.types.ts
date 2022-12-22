import { ReactNode } from "react";
import { SocialMedia } from "../SocialButton/SocialButton.types";

export interface ShareData {
    files?: File[];
    text?: string;
    title?: string;
    url?: string;
}

export interface socialNetworkShare {
    networks: SocialMedia[];
    shareData: ShareData;
}

export interface ShareButtonProps {
    shareData: ShareData;
    networks?: SocialMedia[];
    popover?: ReactNode;
}

export interface ShareButtonPopoverProps {
    options: ShareData[];
}

export function shareItems(text: string, url: string): ShareData[] {
    return [
        {
            title: "Twitter",
            url: `https://twitter.com/intent/tweet?text=${text + " " + url}`,
        },
    ];
}

export const enum SocialShareOptions {
    TWITTER = "twitter",
}
