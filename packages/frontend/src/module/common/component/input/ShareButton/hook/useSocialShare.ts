import { socialNetworkShare } from "../ShareButton.types";

export interface useSocialShareReturn {
    getOptionsShare: () => ShareData[] | undefined;
}

export const useSocialShare = ({ networks, shareData }: socialNetworkShare): useSocialShareReturn => {
    const getOptionsShare = () => {
        const optionsShare: ShareData[] = [];

        for (let index = 0; index < networks.length; index) {
            switch (networks[index]) {
                case "twitter":
                    optionsShare.push({
                        title: "Twitter",
                        url: `https://twitter.com/intent/tweet?text=${shareData.text + " " + shareData.url}`,
                    });
                    break;
                default:
                    break;
            }
            return optionsShare;
        }
    };
    return { getOptionsShare };
};
