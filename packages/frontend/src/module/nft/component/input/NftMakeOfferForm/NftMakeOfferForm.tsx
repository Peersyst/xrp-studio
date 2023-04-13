import { Col, Form } from "@peersyst/react-components";
import useGoToNextTab from "module/common/component/feedback/TabsModal/hooks/useGoToNextTab";
import useSetTabsState from "module/common/component/feedback/TabsModal/hooks/useSetTabsState";
import TabsModalFooter from "module/common/component/feedback/TabsModal/TabsModalFooter/TabsModalFooter";
import DaySelect from "module/common/component/input/DaySelect/DaySelect";
import XrpAddressTextField from "module/common/component/input/XrpAddressTextField/XrpAddressTextField";
import useTranslate from "module/common/hook/useTranslate";
import clsx from "clsx";
import { MakeUserOfferFormData, NftMakeOfferFormDataNames, NftMakeOfferFormProps } from "./NftMakeOfferForm.types";
import XrpMakeOfferAmountTextField from "./XrpMakeOfferAmountTextField";

function NftMakeOfferForm({ onSumbit, className, style }: NftMakeOfferFormProps): JSX.Element {
    //hooks
    const translate = useTranslate();
    const setTabState = useSetTabsState<MakeUserOfferFormData>();
    const goToNextTab = useGoToNextTab();

    //handlers
    function handleSubmit(data: MakeUserOfferFormData) {
        setTabState((state) => ({ ...state, ...data }));
        onSumbit?.(data);
        goToNextTab();
    }

    return (
        <Form onSubmit={handleSubmit} css={{ flex: 1 }} className={clsx("nft-make-offer-form", className)} style={style}>
            <Col flex={1} gap="2.25rem">
                <DaySelect
                    name={NftMakeOfferFormDataNames.EXPIRATION_DAYS}
                    size="lg"
                    label={translate("optionalLabel", { label: translate("expiresIn") })}
                    numberOfDays={7}
                    defaultValue={0}
                    placeholder={translate("selectExpirationDate")}
                />
                <XrpMakeOfferAmountTextField name={NftMakeOfferFormDataNames.PRICE} required variant="filled" label={translate("price")} />
                <XrpAddressTextField
                    allowWalletAddress={false}
                    required
                    name={NftMakeOfferFormDataNames.DESTINATION}
                    variant="filled"
                    label={translate("destination")}
                    placeholder={translate("enterTheDestinationAddress")}
                />
                <TabsModalFooter mainType="submit" />
            </Col>
        </Form>
    );
}

export default NftMakeOfferForm;
