import { useFormatNumber } from "module/common/hook/useFormatNumber";
import { settingsState } from "module/settings/SettingsState";
import { useRecoilValue } from "recoil";
import formatBalance, { FormatBalanceOptions } from "../utils/formatBalance";

export type FormatBalance = (
    balance: bigint | number | string,
    { numberFormatOptions, units, unitsPosition, action }?: FormatBalanceOptions,
) => string;

export const useFormatBalance = (): FormatBalance => {
    const formatNumber = useFormatNumber();
    const { fiat } = useRecoilValue(settingsState);
    const formatBalanceReturn = (
        balance: bigint | number | string,
        { numberFormatOptions, units, unitsPosition, action }: FormatBalanceOptions = { numberFormatOptions: {} },
    ) => {
        const unsignedBalance = balance.toString().replace("-", "");
        const formattedBalance = formatNumber(unsignedBalance, numberFormatOptions);
        const finalUnits = units && units === "fiat" ? fiat : units;
        return formatBalance(formattedBalance, { action, units: finalUnits, unitsPosition, numberFormatOptions });
    };
    return formatBalanceReturn;
};
