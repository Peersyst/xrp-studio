import { TextFieldProps } from "@peersyst/react-components";

export interface UseSearchBarParams {
    onQuery: TextFieldProps["onChange"];
    delay?: number;
}

export interface UseSearchBarReturn {
    value: string | undefined;
    loading: boolean;
    onChange: (value: string) => void;
}

export type UseSearchBar = (params: UseSearchBarParams) => UseSearchBarReturn;
