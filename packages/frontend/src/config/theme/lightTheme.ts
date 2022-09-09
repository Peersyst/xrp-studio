import { createTheme } from "@peersyst/react-components";
import theme from "config/theme/theme";

const lightTheme = createTheme({
    ...theme,
    palette: {
        primary: "#008CFF",
        text: "#141A1F",
        background: "#FAFAFA",
        status: {
            info: "#008CFF",
            success: "#29b32f",
            warning: "#F57C00",
            error: "#D32F2F",
        },

        gray: {
            90: "#FAFAFA",
            "2.5": "#141A1F",
        },
        blue: {
            "2.5": "#001133",
            5: "#002666",
            10: "#003D99",
            15: "#005BCC",
            20: "#0067E5",
            30: "#008CFF",
            40: "#33A3FF",
            50: "#66BEFF",
            55: "#99D8FF",
            60: "#B2E5FF",
            70: "#CCEFFF",
            80: "#E5F8FF",
            90: "#F5FBFF",
        },
        black: {
            "2.5": "#141A1F",
            5: "#21272C",
            10: "#2E3439",
            15: "#394046",
            20: "#454D54",
            30: "#5E676E",
            40: "#777F86",
            50: "#939A9F",
            60: "#AEB3B7",
            70: "#C9CCCF",
            75: "#D6D9DB",
            80: "#E5E7E8",
            85: "#F1F2F3",
            90: "#FAFAFA",
            100: "#FFFFFF",
            0: "#000000",
        },
    },
});

export default lightTheme;
