import { cx } from "@peersyst/react-utils";
import { ChevronLeftIcon, ChevronRightIcon } from "icons";
import { ArrowButtonRoot } from "./ArrowButton.styles";
import { ArrowButtonProps } from "./ArrowButton.types";

const ArrowButton = ({ direction, className, ...rest }: ArrowButtonProps): JSX.Element => {
    return (
        <ArrowButtonRoot className={cx("arrow-button", className)} {...rest}>
            {direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </ArrowButtonRoot>
    );
};

export default ArrowButton;
