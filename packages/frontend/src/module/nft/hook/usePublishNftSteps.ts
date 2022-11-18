import { useState } from "react";
import { usePublishNft } from "module/nft/hook/usePublishNft";
import { useModal } from "@peersyst/react-components";
import usePublishButtonState from "module/nft/hook/usePublishButtonState";
import useTranslate from "module/common/hook/useTranslate";
import { capitalize } from "@peersyst/react-utils";

type PublishNftTabs = 0 | 1 | 2;

export interface ReturnUsePublishNftSteps {
    handleClick: () => Promise<void>;
    isLoading: boolean;
    tab: PublishNftTabs;
}

export default function (id: string): ReturnUsePublishNftSteps {
    const translate = useTranslate();
    const [tab, setTab] = useState<PublishNftTabs>(0);
    const [, setPublishButton] = usePublishButtonState();
    const { hideModal } = useModal();
    const buttonLabel = capitalize(translate("finish"));
    //Hook wait
    // const { startListing, isLoading: listening } = useListenNftPublishStatus();
    const onPublish = () => {
        setPublishButton({ disabled: true, label: buttonLabel });
        setTab(1);
        //startListening();
        return {};
    };

    const onClose = () => {
        hideModal(id);
    };
    const { handlePublish, isPublishing: publishing } = usePublishNft(onPublish, onClose);
    return {
        handleClick: handlePublish,
        isLoading: publishing,
        tab: tab,
    };
}
