import PublishActions from "module/common/component/feedback/PublishActions/PublishActions";
import useTranslate from "module/common/hook/useTranslate";
import { NftPublishActionStep } from "module/common/component/feedback/PublishActions/PublishActions.types";
import { UseMutateAsyncFunction } from "react-query";
import { NftDto } from "module/api/service";

interface NftCall {
    publish: UseMutateAsyncFunction<number | undefined, string, unknown, unknown>;
    startPolling: UseMutateAsyncFunction<NftDto["status"], string, number, unknown>;
}

interface NftPublishActionsProps {
    calls: NftCall;
    responseId: number | undefined;
}

const NftPublishActions = ({ calls, responseId }: NftPublishActionsProps): JSX.Element => {
    const translate = useTranslate();
    const { publish, startPolling } = calls;

    const onSuccess = () => {
        return undefined;
    };

    const poll = async () => {
        if (responseId === undefined) throw new Error("Not valid id");
        await startPolling(responseId);
    };

    const mockSignTransaction = async () => {
        return undefined;
    };

    const mockSuccess = async () => {
        return undefined;
    };

    const steps: NftPublishActionStep[] = [
        {
            title: translate("processingNft"),
            description: translate("processingNftDescription"),
            execution: async () => await publish({}),
        },
        {
            title: translate("confirmCreation"),
            description: translate("confirmCreationDescription"),
            execution: mockSignTransaction,
        },
        {
            title: translate("addingNftBlockchain"),
            description: translate("addingNftBlockchainDescription"),
            execution: poll,
        },
        {
            title: translate("successTitle"),
            description: translate("successDescription"),
            execution: mockSuccess,
        },
    ];

    return <PublishActions steps={steps} onSuccess={onSuccess} />;
};

export default NftPublishActions;
