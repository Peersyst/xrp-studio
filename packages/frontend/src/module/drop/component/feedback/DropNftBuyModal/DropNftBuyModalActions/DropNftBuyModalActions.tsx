import useTranslate from "module/common/hook/useTranslate";
import { ActionStepsHandlers, Step } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionSteps from "module/common/component/feedback/ActionSteps/ActionSteps";
import useBuyNftDrop from "module/drop/query/useBuyNftDrop";
import useNftIsPublishedPolling from "module/drop/hook/useNftIsPublishedPolling";
import xummRequestIsSignedPolling from "module/wallet/util/xummRequestIsSignedPolling";
import { DropDto } from "module/api/service";
import { useQueryClient } from "react-query";
import Queries from "query/queries";

interface DropNftBuyModalActionsProps extends Omit<ActionStepsHandlers, "onSuccess"> {
    drop: DropDto | undefined;
    onSuccess: (id: number) => void;
}

const DropNftBuyModalActions = ({ drop, onStart, onEnd, onSuccess, onError }: DropNftBuyModalActionsProps): JSX.Element => {
    const translate = useTranslate();
    const queryClient = useQueryClient();

    const { mutateAsync: buyNftDrop, data: data } = useBuyNftDrop();
    const { fetch: nftIsPublishedPolling } = useNftIsPublishedPolling(data?.nftId);

    const handleSuccess = () => {
        queryClient.invalidateQueries([Queries.DROP, drop!.collection!.path]);
    };

    const steps: Step[] = [
        {
            title: translate("preparingYourOrder"),
            description: translate("yourOrderIsBeingPrepared"),
            execution: async () => await buyNftDrop(drop!.id),
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
            execution: handleSuccess,
        },
    ];

    return <ActionSteps steps={steps} onStart={onStart} onEnd={onEnd} onSuccess={() => onSuccess(data!.nftId)} onError={onError} />;
};

export default DropNftBuyModalActions;
