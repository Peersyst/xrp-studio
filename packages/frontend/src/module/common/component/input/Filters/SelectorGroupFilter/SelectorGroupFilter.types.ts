import { SelectorGroupProps } from "@peersyst/react-components";

export interface SelectorGroupFilterProps<T, Multiple extends boolean> extends Omit<SelectorGroupProps<T, Multiple>, "name"> {
    name: string;
}
