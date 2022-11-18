import { createModal } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import NftPublishTabs from "module/nft/component/navigation/NftPublishTabs";
import Modal from "module/common/component/feedback/Modal/Modal";
import usePublishNftState from "module/nft/hook/usePublishNftState";
import PublishContent from "module/common/component/layout/PublishContent/PublishContent";
import usePublishNftSteps from "module/nft/hook/usePublishNftSteps";
import usePublishButtonState from "module/nft/hook/usePublishButtonState";
import { capitalize } from "@peersyst/react-utils";
import { useEffect } from "react";

const NftPublishModal = createModal(({ ...modalProps }) => {
    const translate = useTranslate();
    const [{ data: requestNft }] = usePublishNftState();
    const [{ label: buttonLabel, disabled: disabled }, setPublishButton] = usePublishButtonState();

    const { handleClick, isLoading, tab } = usePublishNftSteps(NftPublishModal.id);

    useEffect(() => {
        setPublishButton({ label: capitalize(translate("confirm")), disabled: false });
    }, []);

    return (
        <Modal size="lg" title={translate("publishConfirmation")} {...modalProps}>
            <PublishContent>
                {{
                    cover: requestNft.metadata?.image,
                    feedback: <NftPublishTabs tab={tab} />,
                    footer: (
                        <Button onClick={handleClick} size="lg" variant="primary" loading={isLoading} disabled={disabled}>
                            {buttonLabel}
                        </Button>
                    ),
                }}
            </PublishContent>
        </Modal>
    );
});

export default NftPublishModal;
