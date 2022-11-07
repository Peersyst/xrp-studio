import { css } from "styled-components";

export const SwitchStyles = css(({ theme }) => ({
    ".Switch": {
        height: "1.5rem",
        width: "2.375rem",
        ".SwitchThumb": {
            backgroundColor: "white",
            boxShadow: "none",
            width: "0.875rem",
            height: "0.875rem",
        },
        ".SwitchTrack": {
            backgroundColor: theme.palette.black[70],
            padding: "0.3125rem",
            boxShadow: "none",
        },
        "&.Checked": {
            ".SwitchTrack": {
                backgroundColor: theme.palette.primary,
            },
        },
    },
}));
