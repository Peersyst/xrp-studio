import useTranslate from "module/common/hook/useTranslate";
import { ActionStepsHandlers, Step } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionSteps from "module/common/component/feedback/ActionSteps/ActionSteps";
import { Dispatch, SetStateAction } from "react";
import useBuyNftDrop from "module/drop/query/useBuyNftDrop";
import useDropBuyNftStatePolling from "module/drop/hook/useDropBuyNftStatePolling";
import useXummGetStatusByUuidPolling from "module/drop/hook/useXummGetStatusByUuidPolling";

interface DropNftBuyModalActionsProps extends Omit<ActionStepsHandlers, "onSuccess"> {
    dropId?: number;
    onSuccess: () => void;
    onPollingEnd: Dispatch<SetStateAction<number | undefined>>;
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
            execution: startPolling,
        },
        {
            title: translate("processingYourOrder"),
            description: translate("yourOrderIsBeingProcessed"),
            execution: startPollingXumm,
        },
        {
            title: translate("nftMintingSuccess"),
            description: translate("youHaveMintedYourNftSuccessfully"),
        },
    ];

    return <ActionSteps steps={steps} onStart={onStart} onEnd={onEnd} onSuccess={onSuccess} onError={onError} />;
};

export default DropNftBuyModalActions;
