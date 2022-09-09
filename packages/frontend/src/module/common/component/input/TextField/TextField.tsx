import { cx, capitalize } from "@peersyst/react-utils";
import { TextFieldProps } from "./TextField.types";
import { TextField as BaseTextField } from "@peersyst/react-components";

const TextField = ({ variant = "outlined", showValid = true, className, ...rest }: TextFieldProps): JSX.Element => {
    const appearanceClassName = capitalize(variant);
    return <BaseTextField {...rest} className={cx(className, appearanceClassName)} showValid={showValid} />;
};

export default TextField;
