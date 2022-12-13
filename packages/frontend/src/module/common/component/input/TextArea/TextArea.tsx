import { cx, capitalize } from "@peersyst/react-utils";
import { TextAreaProps } from "./TextArea.types";
import { TextArea as BaseTextArea } from "@peersyst/react-components";
import { useControlled } from "@peersyst/react-hooks";

const TextArea = ({
    variant = "outlined",
    className,
    displayLength,
    maxLength,
    defaultValue = "",
    value: valueProp,
    onChange,
    ...rest
}: TextAreaProps): JSX.Element => {
    const appearanceClassName = capitalize(variant);
    const [value, setValue] = useControlled(defaultValue, valueProp, onChange);
    const length = (value || "").length;

    const handleChange = (newVal: string) => {
        const newLength = newVal.length;
        if (maxLength === undefined || maxLength >= newLength) setValue(newVal);
    };

    return (
        <BaseTextArea
            hint={displayLength ? `${maxLength !== undefined ? length + "/" + maxLength : length}` : ""}
            onChange={handleChange}
            value={value}
            className={cx(className, appearanceClassName)}
            {...rest}
        />
    );
};

export default TextArea;
