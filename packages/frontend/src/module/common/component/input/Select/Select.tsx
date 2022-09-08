import { cx } from "@peersyst/react-utils";
import { Select as BaseSelect } from "@peersyst/react-components";
import { SelectProps } from "./Select.types";

function Select<T>({ appearance = "filled", size = "md", className, ...rest }: SelectProps<T>): JSX.Element {
    const appearanceClassName = appearance[0].toUpperCase() + appearance.slice(1);
    const sizeClassName = size[0].toUpperCase() + size.slice(1);
    return <BaseSelect<T> {...rest} className={cx(appearanceClassName, sizeClassName, className)} />;
}

export default Select;
