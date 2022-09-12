import { css } from "styled-components";

export const FormControlStyles = css(({ theme }) => ({
    ".FormControl": {
        rowGap: "0.75rem",
        ".FormControlHint": {
            marginLeft: 0,
        },
        ".Label": {
            fontWeight: 500,
            fontSize: theme.typography.body1.style.fontSize,
            transition: "color 300ms",
        },
    },
    ".Label": {
        color: theme.palette.black[30],
    },
    ".FormControl.Filled": {
        ".Label": {
            color: theme.palette.black[50],
        },
    },
    ".FormControl.Outlined": {
        ".Label": {
            color: theme.palette.black[60],
        },
    },
}));
