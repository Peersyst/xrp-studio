import { useSearchParams } from "react-router-dom";
import { MultipleSelector, UseFilterOptions, UseFilterReturn } from "./useFilter.types";

export default function useFilter<T, M extends "single" | "multiple" = "single", MB extends boolean = M extends "single" ? false : true>(
    name: string,
    { multiple = false as MB }: UseFilterOptions<MB> = {},
): UseFilterReturn<T, MB> {
    const [params, setSearchParams] = useSearchParams();

    const getCurrentValue = () => {
        if (multiple) {
            return params.getAll(name);
        } else {
            return params.get(name) || "";
        }
    };

    const handleSetFilter = (value: MultipleSelector<string, MB> | undefined) => {
        if (!value || value === "" || (Array.isArray(value) && value.length === 0)) {
            params.delete(name);
            setSearchParams(params);
        } else {
            if (Array.isArray(value)) {
                const oldValue = params.getAll(name);
                if (value.length > oldValue.length) {
                    params.append(name, value[value.length - 1]);
                } else {
                    params.delete(name);
                    value.forEach((v) => params.append(name, v));
                }
                setSearchParams(params);
            } else {
                params.delete(name);
                params.append(name, value);
                setSearchParams(params);
            }
        }
    };

    return [getCurrentValue() as MultipleSelector<T, MB>, handleSetFilter];
}
