import { CreateConfig, createConfig } from "@peersyst/react-components";
import lightTheme from "./theme/lightTheme";
import darkTheme from "./theme/darkTheme";
import prodConfig from "./config.prod.json";
import previewConfig from "./config.preview.json";
import devConfig from "./config.dev.json";
import stagingConfig from "./config.staging.json";
import { XrplAddressValidator } from "config/validators/XrplAddressValidator";
import components from "./components/components";

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
        //Goes here (not it components) because it have to access to envConfig.blockainLinks
        BlockchainAddress: {
            blockchainLinks: envConfig.blockchainLinks,
        },
        ...components,
    },
    themes: {
        light: lightTheme,
        dark: darkTheme,
    },
    validators: {
        address: XrplAddressValidator,
    },
});

export default config;
