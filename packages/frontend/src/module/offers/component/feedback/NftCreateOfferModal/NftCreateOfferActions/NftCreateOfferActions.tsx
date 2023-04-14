import useTranslate from "module/common/hook/useTranslate";
import { ActionStepsHandlers, Step } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionSteps from "module/common/component/feedback/ActionSteps/ActionSteps";
import TabsModalContent from "module/common/component/feedback/TabsModal/TabsModalContent/TabsModalContent";
import { MIN_AMOUNT_TO_CREATE_NFT_OFFER_IN_XRP } from "module/nft/component/input/NftMakeOfferForm/NftMakeOfferForm.constants";
import config from "config/config";
import TabsModalFooter from "module/common/component/feedback/TabsModal/TabsModalFooter/TabsModalFooter";
import useCloseTabModal from "module/common/component/feedback/TabsModal/hooks/useCloseTabModal";

interface NftCreateOfferActionsProps extends ActionStepsHandlers {
    isLoading?: boolean;
}

const NftCreateOfferActions = ({ isLoading, ...rest }: NftCreateOfferActionsProps): JSX.Element => {
    //hooks
    const translate = useTranslate();
    const translateSuccess = useTranslate("success");
    const closeModal = useCloseTabModal();

    async function publish() {
        await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    const steps: Step[] = [
        {
            title: translate("processingYourOffer"),
            description: translate("processingYourOfferDescription"),
            execution: async () => await publish(),
        },
        {
            title: translate("signTheTxInYourXummWallet"),
            description: translate("signOfferDescription", { fee: MIN_AMOUNT_TO_CREATE_NFT_OFFER_IN_XRP, token: config.tokenName }),
            execution: publish,
        },
        {
            title: translateSuccess("offerCreated"),
            description: translateSuccess("offerCreatedDesc"),
        },
    ];

    return (
        <TabsModalContent>
            <ActionSteps steps={steps} {...rest} />
            <TabsModalFooter isLoading={isLoading} cancel={false} mainLabel={translate("close")} onSubmit={closeModal} />
        </TabsModalContent>
    );
};

export default NftCreateOfferActions;
