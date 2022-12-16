import { ReactNode } from "react";

export interface ShareData {
    files?: File[];
    text?: string;
    title?: string;
    url?: string;
}

export interface ShareButtonProps {
    shareData: ShareData;
    popover?: ReactNode;
}

export interface ShareButtonPopoverProps {
    options: ShareData[];
}

export function SHARE_ITEMS(text: string, url: string): ShareData[] {
    return [
        {
            title: "twiter",
            url: `https://twitter.com/intent/tweet?text=${text + " " + url}`,
        },
    ];
}
