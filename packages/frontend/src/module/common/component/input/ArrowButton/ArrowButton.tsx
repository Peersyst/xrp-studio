import { cx, capitalize } from "@peersyst/react-utils";
import { ChevronLeftIcon, ChevronRightIcon } from "icons";
import { ArrowButtonRoot } from "./ArrowButton.styles";
import { ArrowButtonProps } from "./ArrowButton.types";

const ArrowButton = ({ direction, size = "lg", className, ...rest }: ArrowButtonProps): JSX.Element => {
    const sizeClassName = capitalize(size);
    return (
        <ArrowButtonRoot className={cx("arrow-button", sizeClassName, className)} {...rest}>
            {direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </ArrowButtonRoot>
    );
};

export default ArrowButton;
