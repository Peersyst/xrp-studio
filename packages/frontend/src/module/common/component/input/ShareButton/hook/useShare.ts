import { useEffect, useState } from "react";
import { ShareData } from "../ShareButton.types";

export interface UseShareReturn {
    canShare: boolean;
    share: () => void;
}

export type UseShare = (data: ShareData) => UseShareReturn;

export const useShare: UseShare = (shareData: ShareData) => {
    const [canShare, setCanShare] = useState(false);
    useEffect(() => {
        try {
            if (window.navigator && window.navigator.canShare && window.navigator.canShare(shareData)) {
                setCanShare(true);
            }
        } catch (e) {}
    }, [shareData]);
    const share = async () => {
        try {
            if (canShare) await window.navigator.share(shareData);
        } catch (e) {}
    };
    return { canShare, share };
};
