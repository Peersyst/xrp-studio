import { ColorInputProps as BaseColorInputProps } from "@peersyst/react-components";
import { TextFieldProps } from "module/common/component/input/TextField/TextField.types";
import { ColorInput as BaseColorInput } from "@peersyst/react-components";
import TextField from "module/common/component/input/TextField/TextField";

export type ColorInputProps = Omit<BaseColorInputProps<TextFieldProps>, "TextField">;

const ColorInput = (props: ColorInputProps): JSX.Element => <BaseColorInput TextField={TextField} {...props} />;

export default ColorInput;
