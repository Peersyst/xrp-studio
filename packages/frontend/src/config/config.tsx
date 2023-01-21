import { CreateConfig, createConfig } from "@peersyst/react-components";
import darkTheme from "./theme/darkTheme";
import prodConfig from "./config.prod.json";
import previewConfig from "./config.preview.json";
import baseConfig from "./config.base.json";
import devConfig from "./config.dev.json";
import stagingConfig from "./config.staging.json";
import components from "./components/components";
import { XrplAddressValidator } from "config/validators/XrplAddressValidator";

const envConfigs: Record<string, CreateConfig> = {
    test: { ...baseConfig, ...devConfig },
    development: { ...baseConfig, ...devConfig },
    preview: { ...baseConfig, ...previewConfig },
    production: { ...baseConfig, ...prodConfig },
    staging: { ...baseConfig, ...stagingConfig },
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
        default: darkTheme,
    },
    validators: {
        address: XrplAddressValidator,
    },
});

export default config;
