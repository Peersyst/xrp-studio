import { ColorInputProps as BaseColorInputProps } from "@peersyst/react-components";
import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import { ColorInput as BaseColorInput } from "@peersyst/react-components";
import TextField from "module/common/component/input/TextField/TextField";
import { capitalize, cx } from "@peersyst/react-utils";

export type ColorInputProps = Omit<BaseColorInputProps<TextFieldProps>, "TextField">;

const ColorInput = ({
    TextFieldProps: { variant = "outlined", ...restTextFieldProps } = {},
    className,
    ...rest
}: ColorInputProps): JSX.Element => {
    const variantClassName = capitalize(variant);

    return (
        <BaseColorInput
            TextField={TextField}
            className={cx(variantClassName, className)}
            TextFieldProps={{ variant, ...restTextFieldProps }}
            {...rest}
        />
    );
};

export default ColorInput;
