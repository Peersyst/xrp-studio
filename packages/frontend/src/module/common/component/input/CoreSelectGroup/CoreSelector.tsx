import { useContext } from "react";
import { SelectGroupContextType, SelectorProps as CoreSelectorProps } from "./CoreSelectGroup.types";
import { SelectGroupContext } from "./SelectGroupContext";
import { useSelected, handleSelection } from "@peersyst/react-components-core";

function CoreSelector<T>({ value, children }: CoreSelectorProps<T>): JSX.Element {
    const { setValue, readonly, value: selected, multiple, disabled } = useContext<SelectGroupContextType<T>>(SelectGroupContext);
    const isSelected = useSelected(value, selected, multiple);

    const handleSelect = () => {
        if (!readonly && !disabled) {
            setValue(handleSelection(value, selected, multiple, isSelected));
        }
    };

    return (
        <>
            {children({
                isSelected,
                selected,
                setSelected: handleSelect,
                readonly,
                disabled,
                multiple,
            })}
        </>
    );
}

export default CoreSelector;
