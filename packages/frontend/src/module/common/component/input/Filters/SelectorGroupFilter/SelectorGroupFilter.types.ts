import { SelectorGroupProps } from "@peersyst/react-components";

export interface SelectorGroupFilterProps<T, Multiple extends boolean>
    extends Omit<SelectorGroupProps<T, Multiple>, "name" | "onChange" | "value" | "defaultValue"> {
    name: string;
    onChange?: (value: Multiple extends true ? T[] : T | undefined) => void;
}
