import { css } from "styled-components";

export const RootStyles = css(({ theme }) => ({
    ":root": {
        "--horizontal-page-padding": "9.75rem",
        "--appbar-height": "6.25rem",
        [theme.breakpoints.between("sm", "md")]: {
            "--horizontal-page-padding": "7rem",
        },
        [theme.breakpoints.down("sm")]: {
            "--horizontal-page-padding": "3rem",
        },
        [theme.breakpoints.down("mini")]: {
            "--horizontal-page-padding": "2rem",
        },
        [theme.breakpoints.down("mobile")]: {
            "--appbar-height": "4.5rem",
        },
    },
}));
