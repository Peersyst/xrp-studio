import { useState } from "react";
import { usePublishNft } from "module/nft/hook/usePublishNft";

type PublishNftTabs = 0 | 1 | 2;

interface ReturnUsePublishNftSteps {
    handleClick: () => Promise<void>;
    isLoading: boolean;
    tab: PublishNftTabs;
}

export default function (): ReturnUsePublishNftSteps {
    const [tab, setTab] = useState<PublishNftTabs>(0);
    //Hook wait
    // const { startListing, isLoading: listening } = useListenNftPublishStatus();
    const onPublish = () => {
        setTab(1);
        //startListening();
    };
    const { handlePublish, isPublishing: publishing } = usePublishNft(onPublish);
    return {
        handleClick: handlePublish,
        isLoading: publishing,
        tab: tab,
    };
}
