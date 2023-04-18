import { formatNumber, parseNumber } from "../utils/utils";

export interface UseNumericInputParams {
    locale?: string;
    maxDecimals?: number;
}

export interface UseNumericInputReturn {
    format: (value: string) => string;
    parse: (newValue: string, prev: string) => string;
}

export default function useNumericInput({ locale, maxDecimals }: UseNumericInputParams = {}): UseNumericInputReturn {
    const defaultLocale = "en";
    const finalLocale = locale || defaultLocale;

    return {
        format: (value: string) => formatNumber(value, finalLocale, maxDecimals),
        parse: (curr: string, prev: string) => {
            const parseValue = parseNumber(curr, maxDecimals);
            if (parseValue === "NaN") return prev;
            return parseValue;
        },
    };
}
