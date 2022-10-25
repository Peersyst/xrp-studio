import { SelectorGroupProps } from "@peersyst/react-components";

export interface SelectorGroupFilterProps<T> extends Omit<SelectorGroupProps<T>, "name"> {
    name: string;
}
