import { createModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import ActionModal from "module/common/component/feedback/ActionModal/ActionModal";
import NftPublishSuccess from "module/nft/component/feedback/NftPublishSucess/NftPublishSuccess";
import { useNavigate } from "react-router-dom";
import NftPublishError from "module/nft/component/feedback/NftPublishError/NftPublishError";
import { useState } from "react";
import { DropNftBuyModalProps } from "./DropNftBuyModal.types";
import DropInformation from "../../display/DropInformation/DropInformation";
import useGetDrop from "module/drop/query/useGetDrop";
import DropNftBuyModalInformation from "./DropNftBuyModalInformation/DropNftBuyModalInformation";
import DropNftBuyModalActions from "./DropNftBuyModalActions/DropNftBuyModalActions";
import { DropRoutes } from "module/drop/DropRouter";

const DropNftBuyModal = createModal<DropNftBuyModalProps>(({ dropId, ...modalProps }) => {
    const translate = useTranslate();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<unknown>();
    const [nftId, setNftId] = useState<number>();

    const { data: drop, isLoading: dropLoading } = useGetDrop(dropId);

    const goMyDrops = () => {
        navigate(DropRoutes.MY_DROPS);
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
                        name={drop?.collection?.name}
                        items={drop?.items || 0}
                        price={drop?.price}
                        loading={dropLoading}
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
                                onSuccess={goMyDrops}
                                onError={handleError}
                                onPollingEnd={setNftId}
                                dropId={dropId}
                            />
                        ),
                        actions: [
                            { action: "next", disabled: loading || !!error, label: translate("viewDetails") },
                            { action: "close", label: translate("cancel") },
                        ],
                    },
                    {
                        content: error ? <NftPublishError error={error} /> : <NftPublishSuccess id={nftId} />,
                        actions: [{ action: "close", label: translate("close") }],
                    },
                ],
            }}
        </ActionModal>
    );
});

export default DropNftBuyModal;
