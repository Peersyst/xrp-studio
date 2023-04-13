import { TabsModalContextI } from "../context/TabsModalContext";
import useModalTabs from "./useModalTabs";

export default function useGoToNextTab<T>(): TabsModalContextI<T>["goToNextTab"] {
    return useModalTabs<T>().goToNextTab;
}
