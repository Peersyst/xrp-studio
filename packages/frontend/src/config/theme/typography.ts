import { Theme } from "@peersyst/react-components";

const typography: Partial<Theme["typography"]> = {
    h2: {
        component: "h2",
        style: {
            lineHeight: "4.5rem",
            fontSize: "3rem",
        },
    },
    h4: {
        component: "h4",
        style: {
            fontSize: "1.625rem",
        },
    },
    caption1: {
        component: "span",
        style: {
            fontSize: "0.75rem",
        },
    },
    caption2: {
        component: "span",
        style: {
            fontSize: "0.625rem",
        },
    },
};

export default typography;
