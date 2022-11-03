import { cx } from "@peersyst/react-utils";
import ArrowButton from "../../input/ArrowButton/ArrowButton";
import { BackButtonProps } from "./BackButton.types";
import useGoBack from "module/common/hook/useGoBack";

const BackButton = ({ className, ...rest }: BackButtonProps): JSX.Element => {
    const goBack = useGoBack();
    return <ArrowButton {...rest} className={cx("back-button", className)} direction="left" onClick={goBack} />;
};

export default BackButton;
