import { TabsModalContextI } from "../context/TabsModalContext";
import useTabsState from "./useTabsState";

export default function useSetTabsState<T>(): TabsModalContextI<T>["setState"] {
    const setTabsState = useTabsState<T>()[1];
    return setTabsState;
}
