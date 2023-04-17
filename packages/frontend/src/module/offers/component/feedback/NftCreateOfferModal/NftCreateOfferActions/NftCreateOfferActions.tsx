import useTranslate from "module/common/hook/useTranslate";
import { ActionStepsHandlers, Step } from "module/common/component/feedback/ActionSteps/ActionSteps.types";
import ActionSteps from "module/common/component/feedback/ActionSteps/ActionSteps";
import TabsModalContent from "module/common/component/feedback/TabsModal/TabsModalContent/TabsModalContent";
import { MIN_AMOUNT_TO_CREATE_NFT_OFFER_IN_XRP } from "module/offers/component/input/NftMakeOfferForm/NftMakeOfferForm.constants";
import config from "config/config";
import TabsModalFooter from "module/common/component/feedback/TabsModal/TabsModalFooter/TabsModalFooter";
import useCloseTabModal from "module/common/component/feedback/TabsModal/hooks/useCloseTabModal";
import useMakeNftOffer from "module/offers/query/useMakeNftOffer";
import useTabsState from "module/common/component/feedback/TabsModal/hooks/useTabsState";
import { CreateNftOfferModalType, NftCreateOfferModalState } from "../NftCreateOfferModal.types";
import { NftDto } from "module/api/service";
import usePoolXummTx from "module/blockchain/hook/usePoolXummTx";
import usePoolNftCreateOffer from "./hooks/usePoolNftCreateOffer";

interface NftCreateOfferActionsProps extends ActionStepsHandlers {
    isLoading?: boolean;
    nftId: NftDto["id"];
    type: CreateNftOfferModalType;
}

const NftCreateOfferActions = ({ isLoading, nftId, type, ...rest }: NftCreateOfferActionsProps): JSX.Element => {
    //hooks
    const translate = useTranslate();
    const translateSuccess = useTranslate("success");
    const closeModal = useCloseTabModal();
    const [request] = useTabsState<NftCreateOfferModalState>();
    console.log("request", {
        ...request,
        nftId,
        /**
         * A transfer is a sell with amount = 0
         */
        type: type === CreateNftOfferModalType.TRANSFER ? CreateNftOfferModalType.SELL : type,
    });
    const { mutateAsync: makeNftOffer, data: uuid } = useMakeNftOffer({
        ...request,
        nftId,
        /**
         * A transfer is a sell with amount = 0
         */
        type: type === CreateNftOfferModalType.TRANSFER ? CreateNftOfferModalType.SELL : type,
    });
    const { poolNftCreateOffer } = usePoolNftCreateOffer();

    const steps: Step[] = [
        {
            title: translate("processingYourOffer"),
            description: translate("processingYourOfferDescription"),
            execution: makeNftOffer,
        },
        {
            title: translate("signTheTxInYourXummWallet"),
            description: translate("signOfferDescription", { fee: MIN_AMOUNT_TO_CREATE_NFT_OFFER_IN_XRP, token: config.tokenName }),
            execution: () => poolNftCreateOffer(uuid!, nftId),
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
