import { Context, createContext, Dispatch, SetStateAction, useContext } from "react";

export interface ActionButtonGroupContextValue<T extends string = string> {
    loadingAction: T | undefined;
    setLoadingAction: Dispatch<SetStateAction<T | undefined>>;
}

export const ActionButtonGroupContext = createContext<ActionButtonGroupContextValue<any>>({
    loadingAction: undefined,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setLoadingAction: (_: SetStateAction<string | undefined>) => undefined,
});

export const ActionButtonGroupProvider = ActionButtonGroupContext.Provider;
export const ActionButtonGroupConsumer = ActionButtonGroupContext.Consumer;

export function useActionButtonGroup<T extends string = string>(): ActionButtonGroupContextValue<T> {
    return useContext(ActionButtonGroupContext as unknown as Context<ActionButtonGroupContextValue<T>>);
}
