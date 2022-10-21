import { ColProps, FormControlledComponentProps, FormControlProps, LabelProps, RowProps } from "@peersyst/react-components";
import { CoreSelectGroupProps, SelectorDirection } from "../CoreSelectGroup/CoreSelectGroup.types";
import { SelectorProps } from "./Selector/Selector.types";

export type SelectGroupRowProps = Omit<RowProps, "children">;
export type SelectGroupColProps = Omit<ColProps, "children">;

export type SelectGroupProps<T, Multiple extends boolean = false, D extends SelectorDirection = "column"> = FormControlledComponentProps<
    CoreSelectGroupProps<T, SelectorProps<T>, LabelProps, SelectGroupRowProps, SelectGroupColProps, D, Multiple>
> & {
    selectorLabelProps?: Omit<LabelProps, "label">;
};

export type InnerSelectGroupProps<T, Multiple extends boolean = false, D extends SelectorDirection = "column"> = Pick<
    SelectGroupProps<T, Multiple, D>,
    "options" | "children" | "selectorLabelProps"
> &
    Required<
        Pick<
            SelectGroupProps<T, Multiple, D>,
            "selectorWrapperProps" | "direction" | "disabled" | "readonly" | "type" | "multiple" | "value"
        >
    > & {
        setValue: (val: Multiple extends true ? T[] : T) => any;
    };
