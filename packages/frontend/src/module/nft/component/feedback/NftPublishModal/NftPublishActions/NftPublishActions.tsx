import useTranslate from "module/common/hook/useTranslate";
import { Step } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionSteps from "module/common/component/feedback/ActionSteps/ActionSteps";

const NftPublishActions = (): JSX.Element => {
    const translate = useTranslate();

    const onSuccess = () => {
        return undefined;
    };

    const steps: Step[] = [
        {
            title: translate("approveXRPStudio"),
            description: translate("approveXRPStudioDescription"),
            execution: async () => {
                return undefined;
            },
        },
        {
            title: translate("nftCreationConfirmationStepTitle"),
            description: translate("nftCreationConfirmationStepDescription"),
            execution: async () => {
                return undefined;
            },
        },
        {
            title: translate("nftCreationSuccessStepTitle"),
            description: translate("nftCreationSuccessStepDescription"),
            execution: async () => {
                return undefined;
            },
        },
    ];

    return <ActionSteps title={translate("nftCreationSteps")} steps={steps} onSuccess={onSuccess} />;
};

export default NftPublishActions;
