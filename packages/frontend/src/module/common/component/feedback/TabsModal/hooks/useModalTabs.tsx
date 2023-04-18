import { useContext } from "react";
import { TabsModalContext, TabsModalContextI } from "../context/TabsModalContext";

export default function useModalTabs<T>(): TabsModalContextI<T> {
    return useContext<TabsModalContextI<T>>(TabsModalContext);
}
