import { createModal } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import NftPublishTabs from "module/nft/component/navigation/NftPublishTabs/NftPublishTabs";
import Modal from "module/common/component/feedback/Modal/Modal";
import usePublishNftState from "module/nft/hook/usePublishNftState";
import PublishContent from "module/common/component/layout/PublishContent/PublishContent";
import usePublishNftSteps from "module/nft/hook/usePublishNftSteps";
import { useEffect } from "react";
import useNftPublishModalState from "module/nft/hook/useNftPublishModalState";
import { capitalize } from "@peersyst/react-utils";

const NftPublishModal = createModal(({ ...modalProps }) => {
    const translate = useTranslate();
    const [{ data: requestNft }] = usePublishNftState();
    const [{ handleClick, buttonDisabled, buttonLabel, closable, tab }, setNftPublishModal] = useNftPublishModalState();

    const { handleClick: handlePublish, isLoading } = usePublishNftSteps(NftPublishModal.id);

    useEffect(() => {
        setNftPublishModal({
            handleClick: handlePublish,
            buttonLabel: capitalize(translate("confirm")),
            buttonDisabled: buttonDisabled,
            tab: 0,
        });
    }, []);

    return (
        <Modal size="lg" title={translate("publishConfirmation")} closable={closable} {...modalProps}>
            <PublishContent>
                {{
                    cover: requestNft.metadata?.image,
                    feedback: <NftPublishTabs tab={tab} />,
                    footer: (
                        <Button onClick={handleClick} size="lg" variant="primary" loading={isLoading} disabled={buttonDisabled}>
                            {buttonLabel}
                        </Button>
                    ),
                }}
            </PublishContent>
        </Modal>
    );
});

export default NftPublishModal;
