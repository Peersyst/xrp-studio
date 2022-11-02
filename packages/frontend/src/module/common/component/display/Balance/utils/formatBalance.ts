import { BalanceAction, BalanceProps } from "../Balance.types";
import { ACTION_LABEL } from "./actionLabels";
import { CurrencyUnit, CURRENCY_UNIT } from "./currencies";

export interface NumberFormatOptions {
    compactDisplay?: "short" | "long" | undefined;
    notation?: "standard" | "scientific" | "engineering" | "compact" | undefined;
    signDisplay?: "auto" | "never" | "always" | "exceptZero" | undefined;
    unit?: string | undefined;
    unitDisplay?: "short" | "long" | "narrow" | undefined;
    currencyDisplay?: string | undefined;
    currencySign?: string | undefined;
}

export interface FormatBalanceOptions {
    numberFormatOptions: NumberFormatOptions;
    units?: BalanceProps["units"];
    unitsPosition?: BalanceProps["unitsPosition"];
    action?: BalanceAction;
}

export default function (formattedBalanceNumber: string, { action = "display", units, unitsPosition }: FormatBalanceOptions): string {
    const actionLabel = ACTION_LABEL[action];
    const currencyUnit = units && (CURRENCY_UNIT[units as CurrencyUnit] || units);
    const balanceWithLabel = actionLabel + formattedBalanceNumber.toString();
    if (!currencyUnit) return balanceWithLabel;
    if (unitsPosition === "left") {
        return currencyUnit + " " + balanceWithLabel;
    } else {
        return balanceWithLabel + " " + currencyUnit;
    }
}
