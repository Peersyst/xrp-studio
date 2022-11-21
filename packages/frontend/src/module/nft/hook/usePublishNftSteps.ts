import { usePublishNft } from "module/nft/hook/usePublishNft";
import { useModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import { capitalize } from "@peersyst/react-utils";
import { NftPublishModalContext } from "module/nft/component/feedback/NftPublishModal/NftPublishModalContext";
import { useContext } from "react";

export interface ReturnUsePublishNftSteps {
    handleClick: () => Promise<void>;
    isLoading: boolean;
}

export default function (id: string): ReturnUsePublishNftSteps {
    const translate = useTranslate();
    const { hideModal } = useModal();
    const buttonLabelFinish = capitalize(translate("finish"));
    const nftPublishModalContext = useContext(NftPublishModalContext);
    //Hook wait
    // const { startListing, isLoading: listening } = useListenNftPublishStatus();
    const onPublish = () => {
        nftPublishModalContext?.setState({
            handleClick: onClose,
            closable: false,
            buttonDisabled: true,
            buttonLabel: buttonLabelFinish,
            tab: 1,
            modalId: nftPublishModalContext?.state.modalId,
        });
        //startListening();
        return {};
    };

    const onClose = async () => {
        hideModal(id);
    };
    const { handlePublish, isPublishing: publishing } = usePublishNft(onPublish, onClose);
    return {
        handleClick: handlePublish,
        isLoading: publishing,
    };
}
