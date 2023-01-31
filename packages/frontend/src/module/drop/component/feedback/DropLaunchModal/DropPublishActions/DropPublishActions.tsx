import useTranslate from "module/common/hook/useTranslate";
import { Step } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionSteps from "module/common/component/feedback/ActionSteps/ActionSteps";
import useCreateDrop from "module/drop/query/useCreateDrop";
import { DropPublishActionsProps } from "module/drop/component/feedback/DropLaunchModal/DropPublishActions/DropPublishActions.types";
import useWallet from "module/wallet/hook/useWallet";
import useDropCreationMintingItemsStatus from "module/drop/hook/useDropCreationMintingItemsStatus";
import { useFormatNumber } from "module/common/hook/useFormatNumber";
import useDropCreationPayment from "module/drop/hook/useDropCreationPayment";
import useDropCreationAuthorization from "module/drop/hook/useDropCreationAuthorization";

const DropPublishActions = ({ onStart, onSuccess, onEnd, onError, request, collection }: DropPublishActionsProps): JSX.Element => {
    const translate = useTranslate();
    const formatNumber = useFormatNumber();
    const { address } = useWallet();

    const { mutateAsync: create, data: data } = useCreateDrop();
    const { fetch: fetchDropCreationAuthorization } = useDropCreationAuthorization(address!);
    const { fetch: fetchPayment, isSigned, paymentHash } = useDropCreationPayment(collection.id);
    const { fetch: fetchMintedNfts, mintedNfts } = useDropCreationMintingItemsStatus(collection.id, collection.nfts?.length || 0);

    const handleSuccess = () => {
        onSuccess?.(data!.id);
    };

    const steps: Step[] = [
        {
            title: translate("dropCreationAuthorizationStepTitle"),
            description: translate("dropCreationAuthorizationStepText"),
            execution: fetchDropCreationAuthorization,
        },
        {
            title: translate("dropPaymentStepTitle"),
            description: !isSigned ? translate("dropPaymentSignatureStepText") : translate("dropPaymentConfirmationStepText"),
            execution: fetchPayment,
        },
        {
            title: translate("dropCreationStepTitle"),
            description: translate("dropCreationStepText"),
            execution: async () => await create({ request: { ...request, paymentHash: paymentHash! } }),
        },
        {
            title: translate("dropCreationMintingStepTitle"),
            description: translate("dropCreationMintingStepText", { minted: formatNumber(mintedNfts) }),
            execution: fetchMintedNfts,
        },
        {
            title: translate("dropCreationSuccessStepTitle"),
            description: translate("dropCreationSuccessStepText"),
        },
    ];

    return <ActionSteps steps={steps} onStart={onStart} onError={onError} onSuccess={handleSuccess} onEnd={onEnd} />;
};

export default DropPublishActions;
