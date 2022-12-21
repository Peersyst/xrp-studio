import useTranslate from "module/common/hook/useTranslate";
import { ActionStepsHandlers, Step } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionSteps from "module/common/component/feedback/ActionSteps/ActionSteps";
import useBuyNftDrop from "module/drop/query/useBuyNftDrop";
import useDropBuyNftStatePolling from "module/drop/hook/useDropBuyNftStatePolling";
import useXummGetStatusByUuidPolling from "module/drop/hook/useXummGetStatusByUuidPolling";

interface DropNftBuyModalActionsProps extends Omit<ActionStepsHandlers, "onSuccess"> {
    dropId?: number;
    onSuccess: (id: number) => void;
}

const DropNftBuyModalActions = ({ dropId, onStart, onEnd, onSuccess, onError }: DropNftBuyModalActionsProps): JSX.Element => {
    const translate = useTranslate();

    const { mutateAsync: buyNftDrop, data: data } = useBuyNftDrop();
    const { fetch: startPolling } = useDropBuyNftStatePolling(data?.nftId);
    const { fetch: startPollingXumm } = useXummGetStatusByUuidPolling(data?.xummRequestUuid);

    const steps: Step[] = [
        {
            title: translate("preparingYourOrder"),
            description: translate("yourOrderIsBeingPrepared"),
            execution: async () => await buyNftDrop(dropId!),
        },
        {
            title: translate("transactionSignature"),
            description: translate("pleaseSignTransaction"),
            execution: startPollingXumm,
        },
        {
            title: translate("processingYourOrder"),
            description: translate("yourOrderIsBeingProcessed"),
            execution: startPolling,
        },
        {
            title: translate("nftMintingSuccess"),
            description: translate("youHaveMintedYourNftSuccessfully"),
        },
    ];

    return <ActionSteps steps={steps} onStart={onStart} onEnd={onEnd} onSuccess={() => onSuccess(data!.nftId)} onError={onError} />;
};

export default DropNftBuyModalActions;
