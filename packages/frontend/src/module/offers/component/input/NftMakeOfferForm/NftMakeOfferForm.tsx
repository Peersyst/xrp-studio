import { Col, Form } from "@peersyst/react-components";
import useGoToNextTab from "module/common/component/feedback/TabsModal/hooks/useGoToNextTab";
import useSetTabsState from "module/common/component/feedback/TabsModal/hooks/useSetTabsState";
import TabsModalFooter from "module/common/component/feedback/TabsModal/TabsModalFooter/TabsModalFooter";
import DaySelect from "module/common/component/input/DaySelect/DaySelect";
import XrpAddressTextField from "module/common/component/input/XrpAddressTextField/XrpAddressTextField";
import useTranslate from "module/common/hook/useTranslate";
import clsx from "clsx";
import { MakeUserOfferFormData, NftMakeOfferFormDataNames, NftMakeOfferFormProps } from "./NftMakeOfferForm.types";
import XrpMakeOfferAmountTextField from "../XrpMakeOfferAmountTextField/XrpMakeOfferAmountTextField";
import {
    CreateNftOfferModalType,
    NftCreateOfferModalState,
} from "module/offers/component/feedback/NftCreateOfferModal/NftCreateOfferModal.types";
import incomingDaysToTimeNumber from "module/offers/utils/incomingDaysToISOTime";
import XrplService from "module/blockchain/service/XrplService/XrplService";

function NftMakeOfferForm({ onSumbit, className, offerType, style }: NftMakeOfferFormProps): JSX.Element {
    //hooks
    const translate = useTranslate();
    const setTabState = useSetTabsState<NftCreateOfferModalState>();
    const goToNextTab = useGoToNextTab();

    //handlers
    function handleSubmit(data: MakeUserOfferFormData) {
        const { expirationDays, price = "0", destination } = data;

        const finalData: NftCreateOfferModalState = {
            ...(destination && { destination }),
            price: XrplService.xrpToDrops(price),
            //Parse the days to date in number format
            ...(expirationDays && { expiration: incomingDaysToTimeNumber(Number(expirationDays)) }),
        };

        setTabState((state) => ({ ...state, ...finalData }));
        onSumbit?.(finalData);
        goToNextTab();
    }

    return (
        <Form onSubmit={handleSubmit} className={clsx("nft-make-offer-form", className)} style={style} css={{ flex: 1 }}>
            <Col flex={1} gap="2.25rem">
                <DaySelect
                    name={NftMakeOfferFormDataNames.EXPIRATION_DAYS}
                    size="lg"
                    label={translate("optionalLabel", { label: translate("expiresIn") })}
                    numberOfDays={7}
                    placeholder={translate("selectExpirationDate")}
                    hint={translate("expiresInHint")}
                />
                {offerType !== CreateNftOfferModalType.TRANSFER && (
                    <XrpMakeOfferAmountTextField
                        offerType={offerType}
                        name={NftMakeOfferFormDataNames.PRICE}
                        required
                        variant="filled"
                        label={translate("price")}
                    />
                )}
                {offerType !== CreateNftOfferModalType.BUY && (
                    <XrpAddressTextField
                        allowWalletAddress={false}
                        required
                        name={NftMakeOfferFormDataNames.DESTINATION}
                        variant="filled"
                        label={translate("destination")}
                        placeholder={translate("enterTheDestinationAddress")}
                    />
                )}
                <TabsModalFooter mainType="submit" />
            </Col>
        </Form>
    );
}

export default NftMakeOfferForm;
