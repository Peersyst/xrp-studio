import { createConfig } from "@peersyst/react-components";
import theme from "./theme/theme";
import darkTheme from "./theme/darkTheme";

const config = createConfig({
    projectName: "base-project",
    themes: {
        default: theme,
        light: theme,
        dark: darkTheme,
    },
});

export default config;
