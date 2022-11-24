type PublishNftTabs = 0 | 1 | 2;

export interface ReturnUsePublishNftSteps {
    handleClick: () => Promise<void>;
    isLoading: boolean;
    tab: PublishNftTabs;
}

// TODO: Delete after refactoring steps
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (_: string): ReturnUsePublishNftSteps {
    //Hook wait
    // const { startListing, isLoading: listening } = useListenNftPublishStatus();
    //const { handlePublish, isPublishing: publishing } = usePublishNft(onPublish, onClose);
    return {
        handleClick: () => undefined as any,
        isLoading: false,
        tab: 0,
    };
}
