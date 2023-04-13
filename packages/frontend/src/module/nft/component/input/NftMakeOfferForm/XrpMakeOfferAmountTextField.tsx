import clsx from "clsx";
import config from "config/config";
import XrplService from "module/blockchain/service/XrplService/XrplService";
import XrpAmountTextField, { XrpAmountTextFieldProps } from "module/common/component/input/XrpAmountTextField/XrpAmountTextField";
import useTranslate from "module/common/hook/useTranslate";
import { useGetXrpBalance } from "module/wallet/hook/useGetXrpBalance/useGetXrpBalance";
import { MIN_AMOUNT_TO_CREATE_NFT_OFFER_IN_DROPS, MIN_AMOUNT_TO_CREATE_NFT_OFFER_IN_XRP } from "./NftMakeOfferForm.constants";

export type XrpMakeOfferAmountTextFieldProps = Omit<XrpAmountTextFieldProps, "max" | "min" | "error" | "hint">;

function XrpMakeOfferAmountTextField({ className, ...rest }: XrpMakeOfferAmountTextFieldProps): JSX.Element {
    const translateError = useTranslate("error");
    const translate = useTranslate();
    const { data: balance = 0 } = useGetXrpBalance();

    const hasEnoughBalance = canCreateAnOffer(balance);
    const maxAvailable = getMaxAvailableToCreateAnOffer(balance);

    const localeUnits = {
        balance: MIN_AMOUNT_TO_CREATE_NFT_OFFER_IN_XRP,
        token: config.tokenName,
        currentBalance: balance.toString(),
    };

    const notEnoughBalanceErrorText =
        translateError("notEnoughBalance") + ". " + translate("minBalanceAndCurrentBalance", { ...localeUnits });

    return (
        <XrpAmountTextField
            error={[!hasEnoughBalance, notEnoughBalanceErrorText]}
            //TODO: improve validation with bigints and remove this Number()
            lte={hasEnoughBalance ? Number(maxAvailable) : balance}
            hint={translate("minBalanceToCreateNftOffer", { ...localeUnits, maxAvailable })}
            className={clsx("xrp-make-offer-amount-text-field", className)}
            {...rest}
        />
    );
}

export function canCreateAnOffer(balance: number): boolean {
    return balance >= Number(MIN_AMOUNT_TO_CREATE_NFT_OFFER_IN_XRP);
}

export function getMaxAvailableToCreateAnOffer(balance: number): string {
    return XrplService.dropsToXrp(
        String(BigInt(XrplService.xrpToDrops(balance.toString())) - BigInt(MIN_AMOUNT_TO_CREATE_NFT_OFFER_IN_DROPS)),
    );
}

export default XrpMakeOfferAmountTextField;
