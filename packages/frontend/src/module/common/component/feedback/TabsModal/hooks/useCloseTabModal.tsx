import { TabsModalContextI } from "../context/TabsModalContext";
import useModalTabs from "./useModalTabs";

export default function useCloseTabModal<T>(): TabsModalContextI<T>["closeModal"] {
    return useModalTabs<T>().closeModal;
}
