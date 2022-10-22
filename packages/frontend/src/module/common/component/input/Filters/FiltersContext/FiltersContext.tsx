import { createContext } from "react";

export const FiltersContext = createContext<any>({
    value: undefined,
    setValue: () => undefined,
});

export const FiltersContextProvider = FiltersContext.Provider;
export const FiltersContextConsumer = FiltersContext.Consumer;
