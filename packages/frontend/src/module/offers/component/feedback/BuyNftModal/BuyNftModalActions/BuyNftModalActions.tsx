import useTranslate from "module/common/hook/useTranslate";
import { ActionStepsHandlers, Step } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionSteps from "module/common/component/feedback/ActionSteps/ActionSteps";
import TabsModalContent from "module/common/component/feedback/TabsModal/TabsModalContent/TabsModalContent";
import config from "config/config";
import TabsModalFooter from "module/common/component/feedback/TabsModal/TabsModalFooter/TabsModalFooter";
import useCloseTabModal from "module/common/component/feedback/TabsModal/hooks/useCloseTabModal";
import { NftRoutes } from "module/nft/NftRouter";
import { useNavigate } from "react-router-dom";
import useBuyNft from "module/offers/query/useBuyNft";
import { NftDto } from "module/api/service";
import buyNftCreatePooling from "../utils/buyNftCreatePooling";

interface BuyNftModalActionsProps extends ActionStepsHandlers {
    isLoading?: boolean;
    nft: NftDto;
}

const BuyNftModalActions = ({ isLoading, nft, ...rest }: BuyNftModalActionsProps): JSX.Element => {
    //hooks
    const translate = useTranslate();
    const translateSuccess = useTranslate("success");
    const navigate = useNavigate();

    const closeModal = useCloseTabModal();
    const { mutateAsync: buynft } = useBuyNft({ nftId: nft.id });
    const startPooling = buyNftCreatePooling();

    async function goToMyNfts() {
        closeModal();
        navigate(NftRoutes.MY_NFTS);
    }

    const steps: Step[] = [
        {
            title: translate("proceesingYourPurchase"),
            description: translate("processingYourOfferPurchase"),
            execution: buynft,
        },
        {
            title: translate("signTheTxInYourXummWallet"),
            description: translate("signPurchaseDescription", { fee: config.feeInDrops, token: config.tokenName }),
            execution: startPooling,
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
