import { createContext } from "react";

export interface FiltersContext<T> {
    value: T;
    setValue: (value: T) => void;
}

export const FiltersContext = createContext<any>({
    value: undefined,
    setOpen: () => undefined,
});

export const FiltersProvider = FiltersContext.Provider;
export const FiltersConsumer = FiltersContext.Consumer;
