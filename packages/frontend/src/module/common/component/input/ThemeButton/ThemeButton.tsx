import theme from "config/theme/theme";
import { ThemeButtonRoot } from "./ThemeButton.styles";
import { MoonIcon, SunIcon } from "icons";
import { ThemeButtonProps } from "module/common/component/input/ThemeButton/ThemeButton.types";
import { capitalize, cx } from "@peersyst/react-utils";
import { useSetTheme } from "@peersyst/react-components";
import { useState } from "react";

const ThemeButton = ({ size = "sm", className, ...rest }: ThemeButtonProps) => {
    const [currentTheme, setCurrentTheme] = useState(theme.palette.mode);
    const sizeClassName = capitalize(size);
    const setTheme = useSetTheme();

    const changeTheme = () => {
        if (currentTheme === "light") {
            setTheme("dark");
            setCurrentTheme("dark");
        } else {
            setTheme("light");
            setCurrentTheme("light");
        }
    };

    return (
        <ThemeButtonRoot className={cx("theme-button", sizeClassName, className)} {...rest} onClick={changeTheme}>
            {currentTheme === "light" ? <MoonIcon /> : <SunIcon />}
        </ThemeButtonRoot>
    );
};

export default ThemeButton;
