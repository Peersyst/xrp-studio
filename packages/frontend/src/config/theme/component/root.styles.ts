import { css } from "styled-components";

export const RootStyles = css(({ theme }) => ({
    ":root": {
        "--appbar-height": "6.25rem",
        [theme.breakpoints.down("mobile")]: {
            "--appbar-height": "4.5rem",
        },
    },
}));
