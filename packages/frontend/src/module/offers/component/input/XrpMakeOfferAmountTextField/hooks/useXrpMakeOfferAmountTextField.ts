import config from "config/config";
import XrplService from "module/blockchain/service/XrplService/XrplService";
import { XrpAmountTextFieldProps } from "module/common/component/input/XrpAmountTextField/XrpAmountTextField";
import useTranslate from "module/common/hook/useTranslate";
import { useGetXrpBalance } from "module/wallet/hook/useGetXrpBalance/useGetXrpBalance";
import {
    MIN_AMOUNT_TO_CREATE_NFT_OFFER_IN_DROPS,
    MIN_AMOUNT_TO_CREATE_NFT_OFFER_IN_XRP,
} from "../../NftMakeOfferForm/NftMakeOfferForm.constants";
import { XrpMakeOfferAmountTextFieldProps } from "../XrpMakeOfferAmountTextField.types";

function canCreateAnOffer(balance: number): boolean {
    return balance >= Number(MIN_AMOUNT_TO_CREATE_NFT_OFFER_IN_XRP);
}

function getMaxAvailableToCreateAnOffer(balance: number): string {
    return XrplService.dropsToXrp(
        String(BigInt(XrplService.xrpToDrops(balance.toString())) - BigInt(MIN_AMOUNT_TO_CREATE_NFT_OFFER_IN_DROPS)),
    );
}

export default (offerType: XrpMakeOfferAmountTextFieldProps["offerType"]): Partial<XrpAmountTextFieldProps> => {
    const translateError = useTranslate("error");
    const translate = useTranslate();
    const { data: balance = 0 } = useGetXrpBalance();

    //Limit the max amount you can offer when buying an NFT
    const limitMax = offerType === "buy";
    const hasEnoughBalance = canCreateAnOffer(balance);
    const maxAvailable = getMaxAvailableToCreateAnOffer(balance);
    const finalMax = hasEnoughBalance ? Number(maxAvailable) : balance;

    //Show feedback about the balance
    const localeUnits = {
        balance: MIN_AMOUNT_TO_CREATE_NFT_OFFER_IN_XRP,
        token: config.tokenName,
        currentBalance: balance.toString(),
    };
    const notEnoughBalanceErrorText =
        translateError("notEnoughBalance") + ". " + translate("minBalanceAndCurrentBalance", { ...localeUnits });

    return {
        ...(limitMax && {
            lte: Number(finalMax),
            hint: translate("minBalanceToCreateNftOffer", { ...localeUnits, maxAvailable }),
            error: [!hasEnoughBalance, notEnoughBalanceErrorText],
        }),
    };
};
