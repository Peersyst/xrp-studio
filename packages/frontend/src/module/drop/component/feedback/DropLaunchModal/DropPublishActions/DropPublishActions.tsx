import useTranslate from "module/common/hook/useTranslate";
import { Step } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionSteps from "module/common/component/feedback/ActionSteps/ActionSteps";
import useCreateDrop from "module/drop/query/useCreateDrop";
import { DropPublishActionsProps } from "module/drop/component/feedback/DropLaunchModal/DropPublishActions/DropPublishActions.types";
import useWallet from "module/wallet/hook/useWallet";
import useDropCreationAuthorizationStatus from "module/drop/hook/useDropCreationAuthorizationStatus";
import useDropCreationMintingItemsStatus from "module/drop/hook/useDropCreationMintingItemsStatus";

const DropPublishActions = ({ onStart, onSuccess, onEnd, onError, request, collection }: DropPublishActionsProps): JSX.Element => {
    const translate = useTranslate();

    const { mutateAsync: create, data: data } = useCreateDrop();
    const { address } = useWallet();

    const { fetch: fetchMintedNfts, mintedNfts } = useDropCreationMintingItemsStatus(collection.id, collection.nfts?.length || 0);
    const { fetch: fetchIsAuthorized } = useDropCreationAuthorizationStatus(address!);

    const handleSuccess = () => {
        onSuccess?.(data!.id);
    };

    const steps: Step[] = [
        {
            title: translate("dropCreationStepTitle"),
            description: translate("dropCreationStepText"),
            execution: async () => await create({ request }),
        },
        {
            title: translate("dropCreationAuthorizationStepTitle"),
            description: translate("dropCreationAuthorizationStepText"),
            execution: fetchIsAuthorized,
        },
        {
            title: translate("dropCreationMintingStepTitle"),
            description: translate("dropCreationMintingStepText", { pendingNFTs: mintedNfts }),
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
