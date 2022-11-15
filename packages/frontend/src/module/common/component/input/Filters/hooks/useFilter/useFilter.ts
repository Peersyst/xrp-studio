import { useSearchParams } from "react-router-dom";
import { MultipleSelector, UseFilterOptions, UseFilterReturn } from "./useFilter.types";

export default function useFilter<T extends string, M extends boolean = false>(
    name: string,
    { multiple = false as M }: UseFilterOptions<M> = {},
): UseFilterReturn<T, M> {
    const [params, setSearchParams] = useSearchParams();

    const getCurrentValue = () => {
        if (multiple) {
            return params.getAll(name);
        } else {
            return params.get(name) || "";
        }
    };

    const handleSetFilter = (value: MultipleSelector<string, M> | undefined) => {
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

    return [getCurrentValue() as MultipleSelector<T, M>, handleSetFilter];
}
