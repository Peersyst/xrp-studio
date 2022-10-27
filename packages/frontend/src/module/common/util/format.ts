import { FiatCurrencyType } from "module/wallet/types";

export function formatNumber(value: number): string {
    return value.toLocaleString(undefined, { maximumFractionDigits: 2, useGrouping: true });
}

export function formatCurrency(value: number, currency: FiatCurrencyType): string {
    return Intl.NumberFormat([], { style: "currency", currency: currency }).format(value);
}
