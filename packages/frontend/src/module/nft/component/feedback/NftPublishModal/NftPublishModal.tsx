import { createModal } from "@peersyst/react-components";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import { capitalize } from "@peersyst/react-utils";
import NftPublishTabs from "module/nft/component/navigation/NftPublishTabs";
import Modal from "module/common/component/feedback/Modal/Modal";
import usePublishNftState from "module/nft/hook/usePublishNftState";
import PublishContent from "module/common/component/layout/PublishContent/PublishContent";
import usePublishNftSteps from "module/nft/hook/usePublishNftSteps";

const NftPublishModal = createModal(({ ...modalProps }) => {
    const translate = useTranslate();
    const [{ data: requestNft }] = usePublishNftState();

    const { handleClick, isLoading, tab } = usePublishNftSteps();

    return (
        <Modal size="lg" title={translate("publishConfirmation")} {...modalProps}>
            <PublishContent>
                {{
                    cover: requestNft.metadata?.image,
                    feedback: <NftPublishTabs tab={tab} />,
                    footer: (
                        <Button onClick={handleClick} size="lg" variant="primary" loading={isLoading}>
                            {capitalize(translate("confirm"))}
                        </Button>
                    ),
                }}
            </PublishContent>
        </Modal>
    );
});

export default NftPublishModal;
