import { createTheme, ThemePalette } from "@peersyst/react-components";
import theme from "config/theme/theme";

const gray: ThemePalette["gray"] = {
    90: "#141A1F",
    "2.5": "#FAFAFA",
};

const blue: ThemePalette["blue"] = {
    "2.5": "#F5FBFF",
    5: "#E5F8FF",
    10: "#CCEFFF",
    15: "#B2E5FF",
    20: "#99D8FF",
    30: "#66BEFF",
    40: "#33A3FF",
    50: "#008CFF",
    55: "#0067E5",
    60: "#005BCC",
    70: "#003D99",
    80: "#002666",
    90: "#001133",
};

const black: ThemePalette["black"] = {
    "2.5": "#FAFAFA",
    5: "#F1F2F3",
    10: "#E5E7E8",
    15: "#D6D9DB",
    20: "#C9CCCF",
    30: "#AEB3B7",
    40: "#939A9F",
    50: "#777F86",
    60: "#5E676E",
    70: "#454D54",
    75: "#394046",
    80: "#2E3439",
    85: "#21272C",
    90: "#141A1F",
    100: "#000000",
    0: "#FFFFFF",
};

const darkTheme = createTheme({
    ...theme,
    palette: {
        mode: "dark",
        primary: blue[50],
        text: black["2.5"],
        background: black[90],
        disabled: black[60],
        status: {
            info: "#008CFF",
            success: "#37FF33",
            warning: "#F57C00",
            error: "#FF3364",
        },
        gray,
        blue,
        black,
        label: {
            default: black[30],
            filled: black[50],
            outlined: black[60],
        },
        card: black[85],
    },
});

export default darkTheme;
