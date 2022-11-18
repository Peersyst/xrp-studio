import { useState } from "react";
import { usePublishNft } from "module/nft/hook/usePublishNft";
import { useModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { capitalize } from "@peersyst/react-utils";
import useNftPublishModalState from "module/nft/hook/useNftPublishModalState";

type PublishNftTabs = 0 | 1 | 2;

export interface ReturnUsePublishNftSteps {
    handleClick: () => Promise<void>;
    isLoading: boolean;
}

export default function (id: string): ReturnUsePublishNftSteps {
    const translate = useTranslate();

    const { hideModal } = useModal();
    const buttonLabelFinish = capitalize(translate("finish"));
    const buttonLabelConfirm = capitalize(translate("confirm"));
    const [, setNftPublishModal] = useNftPublishModalState();
    //Hook wait
    // const { startListing, isLoading: listening } = useListenNftPublishStatus();
    const onPublish = () => {
        setNftPublishModal({ handleClick: onClose, closable: false, buttonDisabled: true, buttonLabel: buttonLabelFinish, tab: 1 });
        //startListening();
        return {};
    };

    const onClose = async () => {
        hideModal(id);
        setNftPublishModal({ handleClick: onClose, closable: true, buttonDisabled: false, buttonLabel: buttonLabelConfirm, tab: 0 });
    };
    const { handlePublish, isPublishing: publishing } = usePublishNft(onPublish, onClose);
    return {
        handleClick: handlePublish,
        isLoading: publishing,
    };
}
