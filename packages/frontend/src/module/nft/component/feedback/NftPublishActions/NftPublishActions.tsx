import useTranslate from "module/common/hook/useTranslate";
import { ActionStepsHandlers, Step } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionSteps from "module/common/component/feedback/ActionSteps/ActionSteps";
import { CreateNftDraftRequest } from "module/api/service";
import usePublishNft from "module/nft/hook/usePublishNft";
import useNftStatePolling from "module/nft/hook/useNftStatePolling";

interface NftPublishActionsProps extends Omit<ActionStepsHandlers, "onSuccess"> {
    request: CreateNftDraftRequest;
    draftId?: number;
    onSuccess: () => void;
}

const NftPublishActions = ({ request, draftId, onStart, onEnd, onSuccess }: NftPublishActionsProps): JSX.Element => {
    const translate = useTranslate();

    const { mutateAsync: publish, data: responseId } = usePublishNft(request, draftId);
    const { fetch: startPolling } = useNftStatePolling(responseId);

    const poll = async () => {
        if (responseId === undefined) throw new Error("Not valid Id");
        await startPolling();
    };

    const steps: Step[] = [
        {
            title: translate("processingNft"),
            description: translate("processingNftDescription"),
            execution: async () => await publish({}),
        },
        {
            title: translate("addingNftBlockchain"),
            description: translate("addingNftBlockchainDescription"),
            execution: poll,
        },
        {
            title: translate("successTitle"),
            description: translate("successDescription"),
        },
    ];

    return <ActionSteps steps={steps} onStart={onStart} onEnd={onEnd} onSuccess={onSuccess} />;
};

export default NftPublishActions;
