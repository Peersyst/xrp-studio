import { createModal, useToast } from "@peersyst/react-components";
import ActionModal from "module/common/component/feedback/ActionModal/ActionModal";
import { CollectionPublishModalProps } from "module/collection/component/feedback/CollectionPublishModal/CollectionPublishModal.types";
import useTranslate from "module/common/hook/useTranslate";
import NftsPreviewList from "module/nft/component/display/NftsPreviewList/NftsPreviewList";
import { ActionFn } from "module/common/component/feedback/ActionModal/ActionModal.types";
import useCreateCollection from "module/collection/query/useCreateCollection";
import { config } from "config";
import useCheckBalance from "module/wallet/hook/useCheckBalance";
import CollectionInformation from "module/collection/component/display/CollectionInformation/CollectionInformation";

const CollectionPublishModal = createModal<CollectionPublishModalProps>(({ request, ...modalProps }): JSX.Element => {
    const { header, image, name = "", nfts = [] } = request;

    const translate = useTranslate();
    const translateError = useTranslate("error");
    const { showToast } = useToast();

    const { mutateAsync: publish, isLoading: publishing } = useCreateCollection();
    const checkBalance = useCheckBalance();

    const handlePublish: ActionFn = async ({ next }) => {
        const amount = nfts.length * config.feeInDrops;
        const valid = amount && (await checkBalance(amount));
        if (!valid) showToast(translateError("notEnoughBalance"), { type: "error" });
        else {
            await publish({ collection: request, publish: true });
            next();
        }
    };

    return (
        <ActionModal title={translate("publishCollectionConfirmation")} closable={!publishing} {...modalProps}>
            {{
                cover: <CollectionInformation header={header} image={image} name={name} items={nfts.length} />,
                tabs: [
                    {
                        content: <NftsPreviewList nfts={nfts} />,
                        actions: [
                            { label: translate("publish"), action: handlePublish, loading: publishing },
                            { action: "back", disabled: publishing },
                        ],
                    },
                ],
            }}
        </ActionModal>
    );
});

export default CollectionPublishModal;
