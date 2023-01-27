import { createModal } from "@peersyst/react-components";
import { DropLaunchModalProps } from "module/drop/component/feedback/DropLaunchModal/DropLaunchModal.types";
import useTranslate from "module/common/hook/useTranslate";
import ActionModal from "module/common/component/feedback/ActionModal/ActionModal";
import NftsPreviewList from "module/nft/component/display/NftsPreviewList/NftsPreviewList";
import useGetCollection from "module/nft/query/useGetCollection";
import DropInformation from "module/drop/component/display/DropInformation/DropInformation";
import DropPublishActions from "module/drop/component/feedback/DropLaunchModal/DropPublishActions/DropPublishActions";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DropRoutes } from "module/drop/DropRouter";
import DropCost from "module/drop/component/display/DropCost/DropCost";

const DropLaunchModal = createModal<DropLaunchModalProps>(({ request, collection, closable = true, ...modalProps }): JSX.Element => {
    const translate = useTranslate();
    const navigate = useNavigate();

    const { data: { header, image, name = "" } = {}, isLoading: collectionLoading } = useGetCollection(collection.id);

    const [loading, setLoading] = useState(false);

    const handleSuccess = (id: number) => {
        navigate(DropRoutes.DROP.replace(":id", id.toString()), { replace: true });
    };

    const items = useMemo(() => collection?.nfts?.length || 0, [collection]);

    return (
        <ActionModal title={translate("launchDropConfirmation")} closable={!loading && closable} {...modalProps}>
            {{
                cover: (
                    <DropInformation
                        header={header}
                        image={image}
                        name={name}
                        items={items}
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
                footer: <DropCost items={items} />,
            }}
        </ActionModal>
    );
});

export default DropLaunchModal;
