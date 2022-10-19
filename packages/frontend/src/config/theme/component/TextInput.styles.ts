import { alpha } from "@peersyst/react-utils";
import { css } from "styled-components";

export const TextInputStyles = css(({ theme }) => {
    const light = theme.palette.mode === "light";
    return {
        ".FormControl.Md": {
            ".TextInput": {
                height: "2.75rem",
                padding: "0.5rem 0.875rem",
            },
        },
        ".FormControl.Lg": {
            ".TextInput": {
                height: "3.25rem",
                padding: "0.75rem 1rem",
            },
        },
        ".Filled": {
            ".TextInput": {
                backgroundColor: theme.palette.black[80],
            },
        },
        ".Cardfilled": {
            ".TextInput": {
                backgroundColor: theme.palette.black[light ? 75 : 80],
            },
        },
        ".TextInput": {
            color: theme.palette.black[30],
            border: "1px solid " + theme.palette.black[80],
            transition: "color 300ms, border-color 300ms",
            input: {
                fontWeight: 500,
                fontSize: theme.typography.body1.style.fontSize,
            },
            "input::placeholder": {
                color: alpha(theme.palette.black[30], 0.4),
            },
        },
        ".Focused.TextInput": {
            color: theme.palette.black[0],
            input: {
                color: theme.palette.black[0],
                caretColor: theme.palette.primary,
            },
        },
    };
});
