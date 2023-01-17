import { buildConfig } from "./util/config.utils";
import { AwsSecrets } from "./util/loadAwsSecrets";

interface PinataConfig {
    apiKey: string;
    secretKey: string;
    publicGateway: string;
    gateways: string[];
}

export default (secrets: AwsSecrets): PinataConfig => {
    return buildConfig<PinataConfig>({
        apiKey: {
            default: process.env.PINATA_API_KEY || secrets.PINATA_API_KEY,
        },
        secretKey: {
            default: process.env.PINATA_API_SECRET || secrets.PINATA_API_SECRET,
        },
        publicGateway: {
            default: "https://ipfs.pixura.io/ipfs/",
        },
        gateways: {
            default: ["https://ipfs.pixura.io/ipfs/", "https://xrp-stamp.mypinata.cloud/ipfs/", "https://xrp-studio.infura-ipfs.io/ipfs/"],
        },
    });
};
