import { createContext } from "react";

export type FiltersBaseContextValue = Record<string, unknown>;

export interface FiltersContext<T extends FiltersBaseContextValue> {
    value: T;
    setValue: (value: FiltersBaseContextValue) => void;
}

export const FiltersContext = createContext<any>({
    value: undefined,
    setOpen: () => undefined,
});

export const FiltersProvider = FiltersContext.Provider;
export const FiltersConsumer = FiltersContext.Consumer;
