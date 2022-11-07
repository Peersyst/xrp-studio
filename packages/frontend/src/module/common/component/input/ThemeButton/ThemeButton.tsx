import theme from "config/theme/theme";
import { ThemeButtonRoot } from "./ThemeButton.styles";
import { MoonIcon, SunIcon } from "icons";
import { ThemeButtonProps } from "module/common/component/input/ThemeButton/ThemeButton.types";
import { capitalize, cx } from "@peersyst/react-utils";
import { useSetTheme } from "@peersyst/react-components";
import { useEffect, useState } from "react";

const ThemeButton = ({ size = "sm", className, ...rest }: ThemeButtonProps) => {
    const [currentTheme, setCurrentTheme] = useState<string>();
    const sizeClassName = capitalize(size);
    const setTheme = useSetTheme();

    useEffect(() => {
        setCurrentTheme(theme.palette.mode);
        setTheme(theme.palette.mode);
    }, []);

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
