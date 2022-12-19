import useTranslate from "module/common/hook/useTranslate";
import { ActionStepsHandlers, Step } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionSteps from "module/common/component/feedback/ActionSteps/ActionSteps";
import { Dispatch, SetStateAction } from "react";
import useBuyNftDrop from "module/drop/query/useBuyNftDrop";
import useDropBuyNftStatePolling from "module/drop/hook/useDropBuyNftStatePolling";
import useWallet from "module/wallet/hook/useWallet";

interface DropNftBuyModalActionsProps extends Omit<ActionStepsHandlers, "onSuccess"> {
    dropId?: number;
    onSuccess: () => void;
    onPollingEnd: Dispatch<SetStateAction<number | undefined>>;
}

const DropNftBuyModalActions = ({ dropId, onStart, onEnd, onSuccess, onError }: DropNftBuyModalActionsProps): JSX.Element => {
    const translate = useTranslate();

    const { mutateAsync: buyNftDrop } = useBuyNftDrop();
    const { address } = useWallet();
    const { fetch: startPolling } = useDropBuyNftStatePolling(dropId, address!);

    const steps: Step[] = [
        {
            title: translate("publishNftProcessingStepTitle"),
            description: translate("publishNftProcessingStepDescription"),
            execution: async () => await buyNftDrop(dropId!),
        },
        {
            title: translate("publishNftAddingToBlockchainStepTitle"),
            description: translate("publishNftAddingToBlockchainStepDescription"),
            execution: startPolling,
        },
        {
            title: translate("publishNftSuccessStepTitle"),
            description: translate("publishNftSuccessStepDescription"),
        },
    ];

    return <ActionSteps steps={steps} onStart={onStart} onEnd={onEnd} onSuccess={onSuccess} onError={onError} />;
};

export default DropNftBuyModalActions;
