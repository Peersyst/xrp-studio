import { socialNetworkShare, SocialShareOptions } from "../ShareButton.types";

export interface useSocialShareReturn {
    optionsShare: ShareData[] | undefined;
}

export const useSocialShare = ({ networks, shareData }: socialNetworkShare): useSocialShareReturn => {
    const optionsShare: ShareData[] = [];
    for (const network of networks) {
        switch (network) {
            case SocialShareOptions.TWITTER:
                optionsShare.push({
                    title: "Twitter",
                    url: `https://twitter.com/intent/tweet?text=${shareData.text + " " + shareData.url}`,
                });
                break;
            default:
                break;
        }
    }
    return { optionsShare };
};
