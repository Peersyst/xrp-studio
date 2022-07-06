import { createConfig } from "@peersyst/react-components";
import theme from "./theme/theme";
import darkTheme from "./theme/darkTheme";
import prodConfig from "./config.prod.json";
import devConfig from "./config.dev.json";

const config = createConfig({
    ...(process.env.NODE_ENV === "production" ? prodConfig : devConfig),
    themes: {
        default: theme,
        light: theme,
        dark: darkTheme,
    },
});

export default config;
