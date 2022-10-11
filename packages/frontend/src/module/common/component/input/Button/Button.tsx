import { cx } from "@peersyst/react-utils";
import { ButtonRoot } from "module/common/component/input/Button/Button.styles";
import { ButtonProps } from "./Button.types";

const Button = ({ className, rounded, ...props }: ButtonProps): JSX.Element => {
    return <ButtonRoot {...props} className={cx(rounded && "Rounded", className)} />;
};

export default Button;
