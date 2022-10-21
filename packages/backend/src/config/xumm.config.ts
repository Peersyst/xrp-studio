import { buildConfig } from "./util/config.utils";
import { AwsSecrets } from "./util/loadAwsSecrets";

interface XummConfig {
    appKey: string;
    appSecret: string;
}

export default (secrets: AwsSecrets): XummConfig => {
    return buildConfig<XummConfig>({
        appKey: {
            default: process.env.XUMM_API_KEY || secrets.XUMM_API_KEY || "6920b844-f08e-4886-b4a6-3c6a0ba2d477",
            production: process.env.XUMM_API_KEY || secrets.XUMM_API_KEY,
        },
        appSecret: {
            default: process.env.XUMM_SECRET_KEY || secrets.XUMM_SECRET_KEY || "8c5bfd83-d358-47c9-a917-96c59137dea9",
            production: process.env.XUMM_SECRET_KEY || secrets.XUMM_SECRET_KEY,
        },
    });
};
