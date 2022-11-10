import { config } from "config";
import { FiatCurrencyType } from "module/wallet/types";

export type CurrencyUnit = FiatCurrencyType | "token";

export const CURRENCY_UNIT: Record<CurrencyUnit, string> = {
    token: config.tokenName,
    cny: "¥",
    usd: "$",
    eur: "€",
    jpy: "¥",
    gbp: "£",
};
