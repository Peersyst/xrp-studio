import { createModal } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import { capitalize } from "@peersyst/react-utils";
import NftPublishTabs from "module/nft/component/navigation/NftPublishTabs";
import Modal from "module/common/component/feedback/Modal/Modal";
import usePublishNftState from "module/nft/hook/usePublishNftState";
import { usePublishNft } from "module/nft/hook/usePublishNft";
import PublishContent from "module/common/component/layout/PublishContent/PublishContent";
import { useState } from "react";

const NftPublishModal = createModal(({ ...modalProps }) => {
    const translate = useTranslate();
    const [{ data: requestNft }] = usePublishNftState();

    //usePublishNft
    //Retorna handleClick, loading i la tab
    const [tab, setTab] = useState<0 | 1 | 2>(0);
    //Hook wait
    // const { startListing, isLoading: listening } = useListenNftPublishStatus();
    const onPublish = () => {
        setTab(1);
        //startListening();
    };
    const { handlePublish, isLoading: publishing } = usePublishNft(onPublish);

    const loading = publishing;
    return (
        <Modal title={translate("publishConfirmation")} {...modalProps}>
            <PublishContent>
                {{
                    cover: requestNft.metadata!.image,
                    feedback: <NftPublishTabs tab={tab} />,
                    footer: (
                        <Button onClick={handlePublish} size="lg" variant="primary" loading={loading}>
                            {capitalize(translate("confirm"))}
                        </Button>
                    ),
                }}
            </PublishContent>
        </Modal>
    );
});

export default NftPublishModal;
