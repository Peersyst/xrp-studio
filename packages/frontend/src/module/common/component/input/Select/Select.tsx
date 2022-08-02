import { SelectRoot } from "./Select.styles";
import { DropdownProps } from "./Select.types";
import { SelectItem } from "@peersyst/react-components";

function Select<T>({ items, ...rest }: DropdownProps<T>) {
    return (
        // @ts-ignore
        <SelectRoot {...rest}>
            {items.map((item, index) => (
                <SelectItem key={index} value={item.value}>
                    {item.label}
                </SelectItem>
            ))}
        </SelectRoot>
    );
}

export default Select;
