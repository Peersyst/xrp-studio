import { ChevronLeftIcon, ChevronRightIcon } from "icons";
import { ArrowButtonRoot } from "./ArrowButton.styles";
import { ArrowButtonProps } from "./ArrowButton.types";

const ArrowButton = ({ direction, ...rest }: ArrowButtonProps): JSX.Element => {
    return <ArrowButtonRoot {...rest}>{direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</ArrowButtonRoot>;
};

export default ArrowButton;
