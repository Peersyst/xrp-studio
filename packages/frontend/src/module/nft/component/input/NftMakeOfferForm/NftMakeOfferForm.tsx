import { Col, Form } from "@peersyst/react-components";
import DaySelect from "module/common/component/input/DaySelect/DaySelect";
import XrpAddressTextField from "module/common/component/input/XrpAddressTextField/XrpAddressTextField";
import XrpAmountTextField from "module/common/component/input/XrpAmountTextField/XrpAmountTextField";
import useTranslate from "module/common/hook/useTranslate";

export enum NftMakeOfferFormDataNames {
    DAYS = "days",
    PRICE = "price",
    DESTINATION = "destination",
}

function NftMakeOfferForm(): JSX.Element {
    const translate = useTranslate();
    function handleSubmit() {
        console.log("submit");
    }
    return (
        <Form onSubmit={handleSubmit} css={{ flex: 1 }}>
            <Col flex={1} gap="2.25rem">
                <DaySelect
                    size="lg"
                    label={translate("expiresIn")}
                    numberOfDays={7}
                    defaultValue={0}
                    placeholder={translate("selectExpirationDate")}
                />
                <XrpAmountTextField variant="filled" label={translate("price")} />
                <XrpAddressTextField
                    variant="filled"
                    label={translate("destination")}
                    placeholder={translate("enterTheDestinationAddress")}
                />
            </Col>
        </Form>
    );
}

export default NftMakeOfferForm;
