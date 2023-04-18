import { createContext, Dispatch, SetStateAction } from "react";

export interface TabsModalContextI<T> {
    closeModal: () => void;
    goToNextTab: () => void;
    state: T;
    setState: Dispatch<SetStateAction<T>>;
}

export const TabsModalContext = createContext<TabsModalContextI<any>>({
    closeModal: () => undefined,
    goToNextTab: () => undefined,
    state: undefined,
    setState: () => undefined,
});

export const TabsModalProvider = TabsModalContext.Provider;
export const TabsModalConsumer = TabsModalContext.Consumer;
