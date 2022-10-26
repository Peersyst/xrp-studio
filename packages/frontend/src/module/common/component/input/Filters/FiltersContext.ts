import { createContext } from "react";

export type FiltersBaseContextValue = Record<string, unknown>;

export interface FiltersContext<T extends FiltersBaseContextValue> {
    filters: T;
    setFilters: (newFilters: Partial<FiltersBaseContextValue>) => void;
}

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
