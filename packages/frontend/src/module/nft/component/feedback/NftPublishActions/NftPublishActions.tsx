import PublishActions from "module/common/component/feedback/PublishActions/PublishActions";
import useTranslate from "module/common/hook/useTranslate";
import { NftPublishActionStep } from "module/common/component/feedback/PublishActions/PublishActions.types";

const NftPublishActions = (): JSX.Element => {
    const translate = useTranslate();

    const onSuccess = () => {
        return undefined;
    };

    const steps: NftPublishActionStep[] = [
        {
            title: translate("approveXRPStudio"),
            description: translate("approveXRPStudioDescription"),
            execution: async () => {
                return undefined;
            },
        },
        {
            title: translate("confirmCreation"),
            description: translate("confirmCreationDescription"),
            execution: async () => {
                return undefined;
            },
        },
        {
            title: translate("successTitle"),
            description: translate("successDescription"),
            execution: async () => {
                return undefined;
            },
        },
    ];

    return <PublishActions title={translate("creationSteps")} steps={steps} onSuccess={onSuccess} />;
};

export default NftPublishActions;
