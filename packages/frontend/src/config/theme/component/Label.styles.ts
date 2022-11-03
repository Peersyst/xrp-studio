import { css } from "styled-components";

export const LabelStyles = css(({ theme }) => ({
    ".Label": {
        color: theme.palette.label.default,
        fontSize: theme.typography.body1.style.fontSize,
        transition: "color 300ms",
        "&.TopPlacement": {
            fontWeight: 500,
        },
    },
}));
