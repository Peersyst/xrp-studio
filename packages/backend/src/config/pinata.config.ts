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
            default: "https://cloudflare-ipfs.com/ipfs/",
        },
        gateways: {
            default: [
                "https://cloudflare-ipfs.com/ipfs/",
                "https://ipfs.pixura.io/ipfs/",
                "https://xrp-stamp.mypinata.cloud/ipfs/",
                "https://jorropo.net/ipfs/",
                "https://gateway.pinata.cloud/ipfs/",
                "https://gateway.ipfs.io/ipfs/",
                "https://fleek.ipfs.io/ipfs/",
                "https://ipfs.eth.aragon.network/ipfs/",
                "https://ipfs-gateway.cloud/ipfs/",
            ],
        },
    });
};
