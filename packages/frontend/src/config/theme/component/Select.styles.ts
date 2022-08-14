import { css } from "styled-components";
import { SelectDropdown } from "@peersyst/react-components";

export const SelectStyles = css(({ theme }) => ({
    ".Select": {
        color: theme.palette.black[30],
        ".SelectDisplay": {
            fontWeight: 500,
            color: theme.palette.black[30],
            backgroundColor: theme.palette.black[80],
            borderColor: theme.palette.black[80],
            minHeight: "3.25rem",
            padding: "0 0.875rem",
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
