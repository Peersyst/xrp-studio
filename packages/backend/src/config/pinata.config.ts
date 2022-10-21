import { buildConfig } from "./util/config.utils";
import { AwsSecrets } from "./util/loadAwsSecrets";

interface PinataConfig {
    apiKey: string;
    secretKey: string;
    gateway: string;
}

export default (secrets: AwsSecrets): PinataConfig => {
    const gwUrl = process.env.PINATA_GATEWAY || secrets.PINATA_GATEWAY || "https://ipfs.pixura.io/ipfs/";
    return buildConfig<PinataConfig>({
        apiKey: {
            default: process.env.PINATA_API_KEY || secrets.PINATA_API_KEY,
        },
        secretKey: {
            default: process.env.PINATA_API_SECRET || secrets.PINATA_API_SECRET,
        },
        gateway: {
            default: gwUrl.endsWith("/") ? gwUrl : gwUrl + "/",
        },
    });
};
