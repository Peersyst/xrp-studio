import { css } from "styled-components";

export const FormControlStyles = css(({ theme }) => ({
    ".FormControl": {
        rowGap: "0.75rem",
        ".FormControlHint": {
            marginLeft: 0,
        },
        "&.Filled": {
            ".FormControlLabelRoot .Label": {
                color: theme.palette.label.filled,
            },
            "&.Disabled": {
                ".FormControlLabelRoot .Label": {
                    color: theme.palette.label.filled,
                },
            },
        },
        "&.Outlined": {
            ".FormControlLabelRoot .Label": {
                color: theme.palette.label.outlined,
            },
            "&.Disabled": {
                ".FormControlLabelRoot .Label": {
                    color: theme.palette.label.outlined,
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
