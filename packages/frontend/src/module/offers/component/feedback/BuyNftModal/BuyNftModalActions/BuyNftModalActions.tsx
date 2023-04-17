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
import { NftDto, OfferDto } from "module/api/service";
import buyNftCreatePooling from "../hooks/useBuyNftCreatePooling";
import { BuyNftModalType } from "../BuyNftModal";

interface BuyNftModalActionsProps extends ActionStepsHandlers {
    isLoading?: boolean;
    nft: NftDto;
    offer: OfferDto;
    type: BuyNftModalType;
}

const BuyNftModalActions = ({ isLoading, nft, offer, type, ...rest }: BuyNftModalActionsProps): JSX.Element => {
    //hooks
    const translate = useTranslate();
    const translateSuccess = useTranslate("success");
    const navigate = useNavigate();

    const closeModal = useCloseTabModal();
    const { mutateAsync: buynft } = useBuyNft();
    const { startPooling } = buyNftCreatePooling();
    const isTransfer = type === BuyNftModalType.ACCEPT_TRANSFER;

    async function goToMyNfts() {
        closeModal();
        navigate(NftRoutes.MY_NFTS);
    }

    const steps: Step[] = [
        {
            title: translate("proceesingYourPurchase"),
            description: translate("processingYourOfferPurchase"),
            execution: () => buynft({ id: offer.id }),
        },
        {
            title: translate("signTheTxInYourXummWallet"),
            description: translate("signPurchaseDescription", { fee: config.feeInDrops, token: config.tokenName }),
            execution: () => startPooling({ nft, offerHash: offer.offerHash }),
        },
        {
            title: translateSuccess(isTransfer ? "nftReceived" : "nftPurchased"),
            description: translateSuccess(isTransfer ? "nftReceivedDesc" : "nftPurchasedDesc"),
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
