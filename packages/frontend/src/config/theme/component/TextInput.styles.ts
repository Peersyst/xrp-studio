import { css } from "styled-components";

export const TextInputStyles = css(({ theme }) => ({
    ".Filled": {
        ".TextInput": {
            backgroundColor: theme.palette.black[80],
        },
    },
    ".TextInput": {
        color: theme.palette.black[30],
        border: "1px solid " + theme.palette.black[80],
        height: "3.25rem",
        padding: "0.75rem 1rem",
        transition: "color 300ms, border-color 300ms",
        input: {
            fontWeight: 500,
            fontSize: theme.typography.body1.style.fontSize,
        },
    },

    ".Focused.TextInput": {
        color: theme.palette.black[0],
        input: {
            color: theme.palette.black[0],
            caretColor: theme.palette.primary,
        },
    },
}));
