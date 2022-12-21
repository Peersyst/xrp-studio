import { createModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import ActionModal from "module/common/component/feedback/ActionModal/ActionModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DropNftBuyModalProps } from "./DropNftBuyModal.types";
import DropInformation from "../../display/DropInformation/DropInformation";
import useGetDrop from "module/drop/query/useGetDrop";
import DropNftBuyModalInformation from "./DropNftBuyModalInformation/DropNftBuyModalInformation";
import DropNftBuyModalActions from "./DropNftBuyModalActions/DropNftBuyModalActions";
import { NftRoutes } from "module/nft/NftRouter";

const DropNftBuyModal = createModal<DropNftBuyModalProps>(({ dropId, ...modalProps }) => {
    const translate = useTranslate();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<unknown>();

    const { data: drop, isLoading: dropLoading } = useGetDrop(dropId);

    const handleSuccess = (id: number) => {
        navigate(NftRoutes.VIEW_NFT.replace(":id", String(id)));
    };

    const handleError = (e: unknown) => {
        setError(e);
    };

    return (
        <ActionModal title={translate("dropBuyNftConfirmation")} closable={!loading} {...modalProps}>
            {{
                cover: (
                    <DropInformation
                        header={drop?.collection?.header}
                        image={drop?.collection?.image}
                        name={translate("randomNameNft", { collection: drop?.collection?.name })}
                        items={undefined}
                        price={drop?.price}
                        loading={dropLoading}
                        collection={drop?.collection?.name}
                    />
                ),
                tabs: [
                    {
                        content: <DropNftBuyModalInformation drop={drop!} collection={drop?.collection?.name} />,
                        actions: [
                            { action: "next", label: translate("confirm") },
                            { action: "close", label: translate("cancel") },
                        ],
                    },
                    {
                        content: (
                            <DropNftBuyModalActions
                                onStart={() => setLoading(true)}
                                onEnd={() => setLoading(false)}
                                onSuccess={handleSuccess}
                                onError={handleError}
                                dropId={dropId}
                            />
                        ),
                        actions: [
                            { action: "next", disabled: loading || !!error, label: translate("viewDetails") },
                            { action: "close", label: translate("cancel") },
                        ],
                    },
                ],
            }}
        </ActionModal>
    );
});

export default DropNftBuyModal;
