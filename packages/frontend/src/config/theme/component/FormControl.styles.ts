import { css } from "styled-components";

export const FormControlStyles = css(({ theme }) => ({
    ".FormControl": {
        rowGap: "0.75rem",
        ".FormControlError": {
            marginLeft: 0,
        },
        ".Label": {
            fontWeight: 500,
            color: theme.palette.black[30],
            fontSize: theme.typography.body1.style.fontSize,
            transition: "color 300ms",
        },
    },
}));
