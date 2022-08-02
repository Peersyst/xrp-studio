import { SelectProps } from "@peersyst/react-components";
import { ReactNode } from "react";

export interface DropdownItemType<T> {
    /**
     * Label for the dropdown
     */
    label: ReactNode;
    /**
     * Value of the item
     */
    value: T;
}

export type DropdownProps<T> = Omit<SelectProps<T>, "children"> & {
    /**
     * Items to be displayed in the dropdown
     */
    items: DropdownItemType<T>[];
    /**
     * Appearance of the dropdown
     */
};
