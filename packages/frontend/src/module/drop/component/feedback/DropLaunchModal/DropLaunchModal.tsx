import { createModal } from "@peersyst/react-components";
import { DropLaunchModalProps } from "module/drop/component/feedback/DropLaunchModal/DropLaunchModal.types";
import useTranslate from "module/common/hook/useTranslate";
import ActionModal from "module/common/component/feedback/ActionModal/ActionModal";
import NftsPreviewList from "module/nft/component/display/NftsPreviewList/NftsPreviewList";
import useGetCollection from "module/collection/query/useGetCollection";
import DropInformation from "module/drop/component/display/DropInformation/DropInformation";
import DropPublishActions from "module/drop/component/feedback/DropLaunchModal/DropPublishActions/DropPublishActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DropRoutes } from "module/drop/DropRouter";

const DropLaunchModal = createModal<DropLaunchModalProps>(({ request, collection, ...modalProps }): JSX.Element => {
    const translate = useTranslate();
    const navigate = useNavigate();

    const { data: { header, image, name = "" } = {}, isLoading: collectionLoading } = useGetCollection(collection.id);

    const [loading, setLoading] = useState(false);

    const handleSuccess = (id: number) => {
        navigate(DropRoutes.DROP.replace(":id", id.toString()), { replace: true });
    };

    return (
        <ActionModal title={translate("launchDropConfirmation")} {...modalProps}>
            {{
                cover: (
                    <DropInformation
                        header={header}
                        image={image}
                        name={name}
                        items={collection?.nfts?.length || 0}
                        price={request.price}
                        loading={collectionLoading}
                    />
                ),
                tabs: [
                    {
                        content: <NftsPreviewList nfts={collection?.nfts || []} />,
                        actions: [{ action: "next", disabled: collectionLoading }, { action: "back" }],
                    },
                    {
                        content: (
                            <DropPublishActions
                                request={{ ...request, collectionId: collection.id }}
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

export default DropLaunchModal;
