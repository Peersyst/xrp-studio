import { createConfig } from "@peersyst/react-components";
import lightTheme from "./theme/lightTheme";
import darkTheme from "./theme/darkTheme";
import prodConfig from "./config.prod.json";
import devConfig from "./config.dev.json";

const config = createConfig({
    ...(process.env.NODE_ENV === "production" ? prodConfig : devConfig),
    themes: {
        light: lightTheme,
        dark: darkTheme,
    },
});

export default config;
