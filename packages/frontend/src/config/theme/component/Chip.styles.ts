import { css } from "styled-components";

export const ChipStyles = css(({ theme }) => ({
    ".Chip": {
        "&.Filled": {
            borderRadius: theme.borderRadius,
            backgroundColor: theme.palette.black[85],
            color: theme.palette.black[30],
            fontWeight: 500,
        },
        "&.Lg": {
            height: "2.75rem",
            span: {
                fontSize: "1rem",
            },
        },
        "&.Md": {
            fontSize: "0.875rem",
        },
    },
}));
