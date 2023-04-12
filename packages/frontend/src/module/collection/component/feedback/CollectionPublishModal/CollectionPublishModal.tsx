import { createModal } from "@peersyst/react-components";
import ActionModal from "module/common/component/feedback/DeprecatedActionModal/ActionModal";
import { CollectionPublishModalProps } from "module/collection/component/feedback/CollectionPublishModal/CollectionPublishModal.types";
import useTranslate from "module/common/hook/useTranslate";
import NftsPreviewList from "module/nft/component/display/NftsPreviewList/NftsPreviewList";
import CollectionPublishActions from "./CollectionPublishActions/CollectionPublishActions";
import CollectionInformation from "module/collection/component/display/CollectionInformation/CollectionInformation";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CollectionRoutes } from "module/collection/router/CollectionRouter";
import { CollectionDto } from "module/api/service";

const CollectionPublishModal = createModal<CollectionPublishModalProps>(({ request, collection, ...modalProps }): JSX.Element => {
    const { header, image, name = "", nfts = [] } = request;
    const allNfts = useMemo(
        () => [...(collection?.nfts || []).filter((nft) => nft.status !== "confirmed" && nft.status !== "pending"), ...nfts],
        [collection, nfts],
    );

    const translate = useTranslate();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleSuccess = (collection: CollectionDto) => {
        navigate(CollectionRoutes.VIEW_COLLECTION.replace(":path", collection.path), { replace: true });
    };

    return (
        <ActionModal title={translate("publishCollectionConfirmation")} closable={!loading} {...modalProps}>
            {{
                cover: <CollectionInformation header={header} image={image} name={name} items={allNfts.length} />,
                tabs: [
                    {
                        content: <NftsPreviewList nfts={allNfts} />,
                        actions: [{ label: translate("publish"), action: "next" }, { action: "back" }],
                    },
                    {
                        content: (
                            <CollectionPublishActions
                                request={request}
                                collection={collection}
                                onStart={() => setLoading(true)}
                                onEnd={() => setLoading(false)}
                                onSuccess={handleSuccess}
                            />
                        ),
                        actions: [{ action: "close", disabled: loading }],
                    },
                ],
            }}
        </ActionModal>
    );
});

export default CollectionPublishModal;
