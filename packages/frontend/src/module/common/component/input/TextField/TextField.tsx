import { cx, capitalize } from "@peersyst/react-utils";
import { TextFieldProps } from "./TextField.types";
import { TextField as BaseTextField } from "@peersyst/react-components";

const TextField = ({ variant = "outlined", size = "lg", className, ...rest }: TextFieldProps): JSX.Element => {
    const appearanceClassName = capitalize(variant);
    const sizeClassName = capitalize(size);
    return <BaseTextField {...rest} className={cx(className, appearanceClassName, sizeClassName)} />;
};

export default TextField;
