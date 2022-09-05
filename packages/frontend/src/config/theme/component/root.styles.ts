import { css } from "styled-components";

export const RootStyles = css(({ theme }) => ({
    ":root": {
        "--appbar-height": "6.25rem",
        "--appbar-max-width": "76.75rem",
        [theme.breakpoints.down("mobile")]: {
            "--appbar-height": "4.5rem",
        },
    },
}));
