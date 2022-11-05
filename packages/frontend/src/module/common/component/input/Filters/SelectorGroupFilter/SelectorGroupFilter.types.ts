import { SelectorGroupProps } from "@peersyst/react-components";
import { MultipleSelector } from "../FiltersContext";

export interface SelectorGroupFilterProps<T, Multiple extends boolean>
    extends Omit<SelectorGroupProps<T, Multiple>, "name" | "onChange" | "value" | "defaultValue"> {
    name: string;
    onChange?: (value: MultipleSelector<T, Multiple> | undefined) => void;
}
