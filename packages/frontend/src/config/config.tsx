import { CreateConfig, createConfig } from "@peersyst/react-components";
import lightTheme from "./theme/lightTheme";
import darkTheme from "./theme/darkTheme";
import prodConfig from "./config.prod.json";
import previewConfig from "./config.preview.json";
import devConfig from "./config.dev.json";
import stagingConfig from "./config.staging.json";

const envConfigs: Record<string, CreateConfig> = {
    test: devConfig,
    development: devConfig,
    preview: previewConfig,
    production: prodConfig,
    staging: stagingConfig,
};

const envKey = process.env.REACT_APP_CONFIG_ENV || process.env.NODE_ENV;

if (!(envKey in envConfigs)) throw new Error(`${envKey} is not a valid env config`);

const envConfig = envConfigs[envKey];

const config = createConfig({
    ...envConfig,
    components: {
        BlockchainAddress: {
            blockchainLinks: envConfig.blockchainLinks,
        },
        Divider: {
            defaultProps: {
                color: "black.80",
            },
        },
        Drawer: {
            defaultProps: {
                position: "right",
                elevation: 3,
            },
        },
        Modal: {
            defaultProps: {
                elevation: 3,
            },
        },
        Switch: {
            defaultProps: {
                LabelProps: {
                    placement: "right",
                },
            },
        },
        SelectGroup: {
            defaultProps: {
                selectorLabelProps: {
                    placement: "left",
                    alignment: "space-between",
                    singleLine: true,
                },
            },
        },
    },
    themes: {
        light: darkTheme,
        dark: darkTheme,
    },
});

export default config;
