import { createModal } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import NftPublishTabs from "module/nft/component/navigation/NftPublishTabs/NftPublishTabs";
import Modal from "module/common/component/feedback/Modal/Modal";
import usePublishNftState from "module/nft/hook/usePublishNftState";
import PublishContent from "module/common/component/layout/PublishContent/PublishContent";

import { useState } from "react";
import { NftPublishModalContext, NftPublishModalState } from "module/nft/component/feedback/NftPublishModal/NftPublishModalContext";

const NftPublishModal = createModal(({ ...modalProps }) => {
    const translate = useTranslate();
    const [{ data: requestNft }] = usePublishNftState();

    const [nftPublishModal, setNftPublishModal] = useState<Partial<NftPublishModalState>>({
        closable: true,
        tab: 0,
        buttonDisabled: false,
        buttonLabel: translate("confirm"),
        handleClick: async () => {
            return;
        },
        modalId: NftPublishModal.id,
    });
    const { closable, handleClick, buttonDisabled, buttonLabel, tab } = nftPublishModal;

    return (
        <NftPublishModalContext.Provider
            value={{
                state: nftPublishModal,
                setState: setNftPublishModal,
            }}
        >
            <Modal size="lg" title={translate("publishConfirmation")} closable={closable} {...modalProps}>
                <PublishContent>
                    {{
                        cover: requestNft.metadata?.image,
                        feedback: <NftPublishTabs tab={tab!} />,
                        footer: (
                            <Button onClick={handleClick} size="lg" variant="primary" disabled={buttonDisabled}>
                                {buttonLabel}
                            </Button>
                        ),
                    }}
                </PublishContent>
            </Modal>
        </NftPublishModalContext.Provider>
    );
});

export default NftPublishModal;
