import useTranslate from "module/common/hook/useTranslate";
import { ActionStepsHandlers, Step } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionSteps from "module/common/component/feedback/ActionSteps/ActionSteps";
import TabsModalContent from "module/common/component/feedback/TabsModal/TabsModalContent/TabsModalContent";
import config from "config/config";
import TabsModalFooter from "module/common/component/feedback/TabsModal/TabsModalFooter/TabsModalFooter";
import useCloseTabModal from "module/common/component/feedback/TabsModal/hooks/useCloseTabModal";
import { NftRoutes } from "module/nft/NftRouter";
import { useNavigate } from "react-router-dom";

interface BuyNftModalActionsProps extends ActionStepsHandlers {
    isLoading?: boolean;
}

const BuyNftModalActions = ({ isLoading, ...rest }: BuyNftModalActionsProps): JSX.Element => {
    //hooks
    const translate = useTranslate();
    const translateSuccess = useTranslate("success");
    const navigate = useNavigate();

    const closeModal = useCloseTabModal();

    async function publish() {
        await new Promise((resolve) => setTimeout(resolve, 200));
    }

    async function goToMyNfts() {
        closeModal();
        navigate(NftRoutes.MY_NFTS);
    }

    const steps: Step[] = [
        {
            title: translate("proceesingYourPurchase"),
            description: translate("processingYourOfferPurchase"),
            execution: async () => await publish(),
        },
        {
            title: translate("signTheTxInYourXummWallet"),
            description: translate("signPurchaseDescription", { fee: config.feeInDrops, token: config.tokenName }),
            execution: publish,
        },
        {
            title: translateSuccess("nftPurchased"),
            description: translateSuccess("nftPurchasedDesc"),
        },
    ];

    return (
        <TabsModalContent>
            <ActionSteps steps={steps} {...rest} />
            <TabsModalFooter isLoading={isLoading} cancelLabel={translate("close")} mainLabel={translate("myNfts")} onSubmit={goToMyNfts} />
        </TabsModalContent>
    );
};

export default BuyNftModalActions;
