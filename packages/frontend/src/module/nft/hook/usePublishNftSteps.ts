import { useState } from "react";
import { usePublishNft } from "module/nft/hook/usePublishNft";
import { useModal } from "@peersyst/react-components";

type PublishNftTabs = 0 | 1 | 2;

export interface ReturnUsePublishNftSteps {
    handleClick: () => Promise<void>;
    isLoading: boolean;
    tab: PublishNftTabs;
}

export default function (id: string): ReturnUsePublishNftSteps {
    const [tab, setTab] = useState<PublishNftTabs>(0);
    const { hideModal } = useModal();
    //Hook wait
    // const { startListing, isLoading: listening } = useListenNftPublishStatus();
    const onPublish = () => {
        setTab(1);
        //startListening();
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
