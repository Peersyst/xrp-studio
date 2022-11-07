import { ThemeButtonRoot } from "./ThemeButton.styles";
import { MoonIcon, SunIcon } from "icons";
import { ThemeButtonProps } from "module/common/component/input/ThemeButton/ThemeButton.types";
import { capitalize, cx } from "@peersyst/react-utils";
import { useSetTheme } from "@peersyst/react-components";
import { useTheme } from "styled-components";

const ThemeButton = ({ size = "sm", className, ...rest }: ThemeButtonProps) => {
    const sizeClassName = capitalize(size);
    const setTheme = useSetTheme();
    const {
        palette: { mode },
    } = useTheme();

    const changeTheme = () => {
        if (mode === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    return (
        <ThemeButtonRoot className={cx("theme-button", sizeClassName, className)} {...rest} onClick={changeTheme}>
            {mode === "light" ? <MoonIcon /> : <SunIcon />}
        </ThemeButtonRoot>
    );
};

export default ThemeButton;
