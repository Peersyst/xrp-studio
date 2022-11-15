import { SelectorGroupProps } from "@peersyst/react-components";

export interface SelectorGroupFilterProps<T extends string, Multiple extends boolean>
    extends Omit<SelectorGroupProps<T, Multiple>, "name" | "value" | "defaultValue"> {
    name: string;
}
