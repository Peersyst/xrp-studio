import { cx, capitalize } from "@peersyst/react-utils";
import { TextAreaProps } from "./TextArea.types";
import { TextArea as BaseTextArea } from "@peersyst/react-components";
import { useState } from "react";
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
    const [length, setLength] = useState(0);
    const [value, setValue] = useControlled<string>(defaultValue, valueProp, onChange);
    const handleChange = (e: string) => {
        setValue(e);
        setLength(e.length);
    };

    return (
        <BaseTextArea
            hint={displayLength ? `${length}/${maxLength}` : ""}
            {...rest}
            onChange={handleChange}
            value={value}
            className={cx(className, appearanceClassName)}
        />
    );
};

export default TextArea;
