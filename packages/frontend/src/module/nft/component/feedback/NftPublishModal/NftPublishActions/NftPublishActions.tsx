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
    onPublished: (id: number) => void;
}

const NftPublishActions = ({ request, draftId, onStart, onEnd, onSuccess, onError, onPublished }: NftPublishActionsProps): JSX.Element => {
    const translate = useTranslate();

    const { mutateAsync: publish, data: responseId } = usePublishNft(request, draftId);
    const { fetch: startPolling } = useNftStatePolling(responseId, { onSuccess: () => onPublished(responseId!) });

    const steps: Step[] = [
        {
            title: translate("publishNftProcessingStepTitle"),
            description: translate("publishNftProcessingStepDescription"),
            execution: async () => await publish({}),
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

export default NftPublishActions;
