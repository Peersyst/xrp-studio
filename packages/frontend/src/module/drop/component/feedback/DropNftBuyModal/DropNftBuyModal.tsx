import { createModal } from "@peersyst/react-components";
import useTranslate from "module/common/hook/useTranslate";
import ActionModal from "module/common/component/feedback/DeprecatedActionModal/ActionModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DropNftBuyModalProps } from "./DropNftBuyModal.types";
import useGetDrop from "module/drop/query/useGetDrop";
import DropNftBuyModalInformation from "./DropNftBuyModalInformation/DropNftBuyModalInformation";
import DropNftBuyModalActions from "./DropNftBuyModalActions/DropNftBuyModalActions";
import { NftRoutes } from "module/nft/NftRouter";
import DropNftInformation from "module/drop/component/display/DropNftInformation/DropNftInformation";
import useCheckBalanceQuery from "module/wallet/query/useCheckBalanceQuery";

const DropNftBuyModal = createModal<DropNftBuyModalProps>(({ dropId, ...modalProps }) => {
    const translate = useTranslate();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<unknown>();

    const { data: drop, isLoading: dropLoading } = useGetDrop(dropId);
    const { collection: { header = "", image = "", name = "" } = {}, price = "0" } = drop || {};

    const { data: hasEnoughBalance = false, isLoading: checkBalanceIsLoading } = useCheckBalanceQuery(drop?.price);

    const isLoading = dropLoading || checkBalanceIsLoading;

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
                    <DropNftInformation
                        header={header}
                        image={image}
                        name={translate("randomNameNft", { collection: name })}
                        items={undefined}
                        price={price}
                        loading={isLoading}
                        collection={name}
                    />
                ),
                tabs: [
                    {
                        content: (
                            <DropNftBuyModalInformation
                                loading={isLoading}
                                drop={drop}
                                collection={name}
                                hasEnoughBalance={hasEnoughBalance}
                            />
                        ),
                        actions: [
                            { action: "next", disabled: isLoading || !hasEnoughBalance, label: translate("confirm") },
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
                                drop={drop}
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
