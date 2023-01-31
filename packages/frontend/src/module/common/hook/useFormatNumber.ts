import useTranslate from "./useTranslate";

export type FormatNumber = (n: number | string | bigint, options?: Intl.NumberFormatOptions) => string;

export const useFormatNumber = (): FormatNumber => {
    const translate = useTranslate();
    const formatNumber = (n: number | string | bigint, options?: Intl.NumberFormatOptions) => {
        return translate("formatNumber", { val: n, ...options });
    };
    return formatNumber;
};
