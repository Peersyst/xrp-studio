import { ModalProps } from "../Modal/Modal.types";

export interface ModalTab {
    title?: string;
    content: React.ReactNode;
}

export interface TabsModalProps<T> extends Omit<ModalProps, "children" | "title"> {
    tabs: ModalTab[];
    title?: string;
    defaultTab?: number;
    defaultState?: T;
}
