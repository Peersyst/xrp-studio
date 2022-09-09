import { cx, capitalize } from "@peersyst/react-utils";
import { TextFieldProps } from "./TextField.types";
import { TextField as BaseTextField } from "@peersyst/react-components";

const TextField = ({ variant = "outlined", size = "lg", showValid = true, className, ...rest }: TextFieldProps): JSX.Element => {
    const appearanceClassName = capitalize(variant);
    const sizeClassName = capitalize(size);
    return <BaseTextField {...rest} className={cx(className, appearanceClassName, sizeClassName)} showValid={showValid} />;
};

export default TextField;
