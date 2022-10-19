import { TextFieldProps } from "@peersyst/react-components";

export interface UseDebounceParams {
    onQuery: TextFieldProps["onChange"];
    delay?: number;
    defaultValue?: string | undefined;
}

export interface UseDebounceReturn {
    value: string | undefined;
    loading: boolean;
    onChange: (value: string) => void;
}

export type UseDebounce = (params: UseDebounceParams) => UseDebounceReturn;
