import { cx } from "@peersyst/react-utils";
import { ButtonRoot } from "module/common/component/input/Button/Button.styles";
import { ButtonProps } from "./Button.types";
import { useColor } from "@peersyst/react-components";

const Button = ({ className, rounded, color: colorProp, ...props }: ButtonProps): JSX.Element => {
    const color = useColor(colorProp);

    // Cast color to any because prop conflicts with react-component's declaration. It is fine as it is handled in Button.styles.ts
    return <ButtonRoot {...props} color={color as any} className={cx(rounded && "Rounded", className)} />;
};

export default Button;
