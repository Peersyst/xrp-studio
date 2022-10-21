import { Switch, Checkbox, RadioButton } from "@peersyst/react-components";
import { cx } from "@peersyst/react-utils";
import { useRef } from "react";
import { SelectorType } from "../../CoreSelectGroup/CoreSelectGroup.types";
import CoreSelector from "../../CoreSelectGroup/CoreSelector";
import { SelectorProps } from "./Selector.types";

export const SELECTOR_CONTROLLERS: Record<SelectorType, typeof Switch> = {
    checkbox: Checkbox,
    radio: RadioButton,
    switch: Switch,
};

function Selector<T>(props: SelectorProps<T>): JSX.Element {
    //TODO: fer merge de les props useMergeDefaultProps
    //const { type, className, style, value, ...rest } = useMergeDefaultProps("Selector", props);
    const { type, className, style, value, ...rest } = props;

    /**
     * This will make the Controller not to be reactive to the type prop
     * but on the other hand only one Controller will be created in the first render
     */
    const Controller = useRef(SELECTOR_CONTROLLERS[type]).current;
    return (
        <CoreSelector value={value}>
            {({ setSelected, isSelected, readonly, disabled }) => {
                return (
                    <Controller
                        style={style}
                        readonly={readonly}
                        disabled={disabled}
                        className={cx("Selector", isSelected && "Selected", className)}
                        value={isSelected}
                        onChange={setSelected}
                        {...rest}
                    />
                );
            }}
        </CoreSelector>
    );
}

export default Selector;
