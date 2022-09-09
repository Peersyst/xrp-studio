import { cx, capitalize } from "@peersyst/react-utils";
import { Select as BaseSelect } from "@peersyst/react-components";
import { SelectProps } from "./Select.types";

function Select<T>({ variant = "filled", size = "md", className, ...rest }: SelectProps<T>): JSX.Element {
    const appearanceClassName = capitalize(variant);
    const sizeClassName = capitalize(size);
    return <BaseSelect<T> {...rest} className={cx(appearanceClassName, sizeClassName, className)} />;
}

export default Select;
