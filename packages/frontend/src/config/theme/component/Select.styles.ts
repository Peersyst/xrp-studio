import { css } from "styled-components";
import { SelectDropdown } from "@peersyst/react-components";

export const SelectStyles = css(({ theme }) => ({
    ".FormControl.Md": {
        ".SelectDisplay": {
            minHeight: "2.75rem",
        },
    },
    ".FormControl.Lg": {
        ".SelectDisplay": {
            minHeight: "3.25rem",
        },
        ".SelectItem": {
            padding: "0.875rem 1.25rem",
        },
    },
    ".FormControl.Filled": {
        ".SelectDisplay": {
            backgroundColor: theme.palette.black[80],
        },
    },
    ".Select": {
        ".SelectDisplay": {
            fontWeight: 500,
            color: theme.palette.black[30],
            borderColor: theme.palette.black[80],
            padding: "0.5rem 0.875rem",
            transition: "border-color 300ms",
            [SelectDropdown]: {
                color: theme.palette.black[60],
            },
            "&.Open": {
                borderColor: theme.palette.primary,
            },
        },
    },
}));
