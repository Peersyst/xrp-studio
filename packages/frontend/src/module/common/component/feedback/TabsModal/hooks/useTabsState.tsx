import { TabsModalContextI } from "../context/TabsModalContext";
import useModalTabs from "./useModalTabs";

export type UseTabsStateReturn<T> = [TabsModalContextI<T>["state"], TabsModalContextI<T>["setState"]];

export default function useTabsState<T>(): UseTabsStateReturn<T> {
    const { state, setState } = useModalTabs<T>();
    return [state, setState];
}
