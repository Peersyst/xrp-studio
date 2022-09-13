export interface ShareData {
    files?: File[];
    text?: string;
    title?: string;
    url?: string;
}

export interface ShareButtonProps {
    shareData: ShareData;
}
