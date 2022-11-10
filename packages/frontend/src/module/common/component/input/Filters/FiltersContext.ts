import { createContext } from "react";

export type FiltersBaseContextValue = Record<string, unknown>;

export type FilterTypedValue<S extends string, T> = Record<S, T>;

export type MultipleSelector<T, M extends boolean> = M extends true ? T[] : T;

export type FiltersContextType<T extends FiltersBaseContextValue> = {
    filters: T;
    setFilters: (newFilters: T) => void;
};

export enum BaseFiltersNames {
    QUERY = "query",
    ORDER = "order",
}

export const FiltersContext = createContext<any>({
    filters: undefined,
    setFilters: () => undefined,
});

export const FiltersProvider = FiltersContext.Provider;
export const FiltersConsumer = FiltersContext.Consumer;
