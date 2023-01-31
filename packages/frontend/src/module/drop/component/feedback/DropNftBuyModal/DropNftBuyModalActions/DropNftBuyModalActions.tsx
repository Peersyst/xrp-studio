import useTranslate from "module/common/hook/useTranslate";
import { ActionStepsHandlers, Step } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionSteps from "module/common/component/feedback/ActionSteps/ActionSteps";
import useBuyNftDrop from "module/drop/query/useBuyNftDrop";
import useNftIsPublishedPolling from "module/drop/hook/useNftIsPublishedPolling";
import xummRequestIsSignedPolling from "module/wallet/util/xummRequestIsSignedPolling";

interface DropNftBuyModalActionsProps extends Omit<ActionStepsHandlers, "onSuccess"> {
    dropId?: number;
    onSuccess: (id: number) => void;
}

const DropNftBuyModalActions = ({ dropId, onStart, onEnd, onSuccess, onError }: DropNftBuyModalActionsProps): JSX.Element => {
    const translate = useTranslate();

    const { mutateAsync: buyNftDrop, data: data } = useBuyNftDrop();
    const { fetch: nftIsPublishedPolling } = useNftIsPublishedPolling(data?.nftId);

    const steps: Step[] = [
        {
            title: translate("preparingYourOrder"),
            description: translate("yourOrderIsBeingPrepared"),
            execution: async () => await buyNftDrop(dropId!),
        },
        {
            title: translate("transactionSignature"),
            description: translate("pleaseSignTransaction"),
            execution: () => xummRequestIsSignedPolling(data!.xummRequestUuid),
        },
        {
            title: translate("processingYourOrder"),
            description: translate("yourOrderIsBeingProcessed"),
            execution: nftIsPublishedPolling,
        },
        {
            title: translate("nftMintingSuccess"),
            description: translate("youHaveMintedYourNftSuccessfully"),
        },
    ];

    return <ActionSteps steps={steps} onStart={onStart} onEnd={onEnd} onSuccess={() => onSuccess(data!.nftId)} onError={onError} />;
};

export default DropNftBuyModalActions;
