import { cx } from "@peersyst/react-utils";
import { TextFieldProps } from "./TextField.types";
import { TextField as BaseTextField } from "@peersyst/react-components";

const TextField = ({ appearance = "outlined", className, ...rest }: TextFieldProps): JSX.Element => {
    const appearanceClassName = appearance[0].toUpperCase() + appearance.slice(1);
    return <BaseTextField {...rest} className={cx(className, appearanceClassName)} />;
};

export default TextField;
