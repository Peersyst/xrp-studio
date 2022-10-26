import { css } from "styled-components";

export const FormControlStyles = css(({ theme }) => ({
    ".FormControl": {
        rowGap: "0.75rem",
        ".FormControlHint": {
            marginLeft: 0,
        },
        ".FormControlLabelRoot .Label": {
            fontWeight: 500,
            color: theme.palette.black[30],
            fontSize: theme.typography.body1.style.fontSize,
            transition: "color 300ms",
        },
        "&.Filled": {
            ".FormControlLabelRoot .Label": {
                color: theme.palette.black[50],
            },
            "&.Disabled": {
                "> .Label": {
                    color: theme.palette.black[50],
                },
            },
        },
        "&.Outlined": {
            ".FormControlLabelRoot .Label": {
                color: theme.palette.black[60],
            },
            "&.Disabled": {
                ".FormControlLabelRoot .Label": {
                    color: theme.palette.black[60],
                },
            },
        },
        "&.Focused": {
            ".FormControlLabelRoot .Label": {
                color: theme.palette.primary,
            },
        },
    },
}));
